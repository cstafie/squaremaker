const window = require('svgdom');
const SVG = require('svg.js')(window);
const document = window.document;
const fs = require('fs');
// let draw = SVG(document.documentElement); // TODO: size

// constants
const width = 3;
const height = 3;
const base = 30;

// Runtime is O(2 ^ numInnerEdges)
const numInnerEdges = (width - 1) * height + (height - 1) * width;
const innerEdges = [];

for (let row = 0; row < height; row++) {
	for (let col = 0; col < width; col++) {
		if (col < width - 1) {
			innerEdges.push({
				x1: (col + 1) * width,
				y1: row * width,
				x2: (col + 1) * width,
				y2: (row + 1) * width,
			});
		}

		if (row < height - 1) {
			innerEdges.push({
				x1: col * width,
				y1: (row + 1) * width,
				x2: (col + 1) * width,
				y2: (row + 1) * width,
			});
		}

	}
}

console.log(numInnerEdges, innerEdges.length);


const makeFile = async (name, svg) => {
	return new Promise( (resolve, reject) => {
		fs.writeFile(`${__dirname}/squares/square${name}.svg`, svg, (err) => {
			if (err) reject(err)
			else resolve(name);
		});
	});
}

const combinations = Math.pow(2, numInnerEdges);
const id = 1;

const drawLine = (draw, {x1, y1, x2, y2}) => {
	draw.line(x1 * base, y1 * base, x2 * base, y2 * base)
		.stroke({ color: '#000', width: 2 })
}

const drawCombinations = async (prev, id) => {
	if (id > combinations) return;

	const edgeIndex = Math.floor(Math.log2(id + 1)) - 1;
	const edge = innerEdges[edgeIndex];

	console.log(edge, id, combinations, edgeIndex);
	const canvas = prev ? SVG(document.documentElement).svg(prev) : SVG(document.documentElement);
	drawLine(canvas, edge);
	const next = canvas.svg();
	const name = await makeFile(id, next);
	console.log("success: ", name);
	drawCombinations(next, ++id);
}

// drawLine({x1: 0, y1: 0, x2: width * base, y2: 0});
// drawLine({x1: width * base, y1: 0, x2: width * base, y2: height * base});
// drawLine({x1: 0, y1: height * base, x2: width * base, y2: height * base});
// drawLine({x1: 0, y1: 0, x2: 0, y2: height * base});

drawCombinations(undefined, 1);





