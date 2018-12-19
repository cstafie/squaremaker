const fs = require('fs');
const _cloneDeep = require('lodash/cloneDeep');

const {
	size
} = require('./config');

const drawLine = (svg, {x1, y1, x2, y2}) => {
	svg.line(x1 * size, y1 * size, x2 * size, y2 * size)
		.stroke({ color: '#000', width: 2 })
}

const drawContour = (svg, width, height) => {
	drawLine(svg, { x1: 0, y1: 0, x2: width, y2: 0 });
	drawLine(svg, { x1: 0, y1: 0, x2: 0, y2: height });
	drawLine(svg, { x1: width, y1: 0, x2: width, y2: height });
	drawLine(svg, { x1: 0, y1: height, x2: width, y2: height });
}

const createFile = async (name, string, cb) => {
	const fileName = `${__dirname}/squares/square${name}.svg`;
	fs.writeFile(fileName, string, cb);
}

const defineInnerEdges = (width, height) => { 
	const temp = [];
	for (let row = 0; row < height; row++) {
		for (let col = 0; col < width; col++) {
			if (col < width - 1) {
				temp.push({
					x1: (col + 1),
					y1: row,
					x2: (col + 1),
					y2: (row + 1),
				});
			}

			if (row < height - 1) {
				temp.push({
					x1: col,
					y1: (row + 1),
					x2: (col + 1),
					y2: (row + 1),
				});
			}
		}
	}

	return temp;
}

const makeSVGInstance = () => {
	// TODO: figure out how not to write the next line
	const window = _cloneDeep(require('svgdom'));
	const SVG = require('svg.js')(window);
	const document = window.document;
	return SVG(document.documentElement);
}


module.exports = {
	defineInnerEdges,
	createFile,
	makeSVGInstance,
	drawLine,
	drawContour,
}