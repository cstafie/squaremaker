const fs = require('fs');

const {
	size
} = require('./config');


const createFile = async (name, string, cb) => {
	return new Promise( (resolve, reject) => {
		const fileName = `${__dirname}/squares/square${name}.svg`;
		fs.writeFile(fileName, string, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve(fileName);
			}
		});
	});
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

const svgOpen = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs">';
const svgClose = '</svg>';

function SVG() {
	this.content = [svgOpen];
}

SVG.prototype.drawLine = function({x1, y1, x2, y2}) {

	this.content.push(`<line id="SvgjsLine${this.content.length}}" x1="${x1*size}" y1="${y1*size}" x2="${x2*size}" y2="${y2*size}" stroke="#000000" stroke-width="2"/>`);
}

SVG.prototype.drawContour = function(width, height) {
	this.drawLine({ x1: 0, y1: 0, x2: width, y2: 0 });
	this.drawLine({ x1: 0, y1: 0, x2: 0, y2: height });
	this.drawLine({ x1: width, y1: 0, x2: width, y2: height });
	this.drawLine({ x1: 0, y1: height, x2: width, y2: height });
}

SVG.prototype.toString = function() {
	this.content.push(svgClose);
	return this.content.join('');
}

module.exports = {
	defineInnerEdges,
	createFile,
	SVG,
}