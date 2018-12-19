
const progressBar = require('progress');

const { 
	defineInnerEdges,
	createFile,
	makeSVGInstance,
	drawLine,
	drawContour
} = require('./lib');

const {
	width,
	height
} = require('./config');


const numInnerEdges = (width - 1) * height + (height - 1) * width; // OR 2 * width * height - width - height
// Runtime is O( (2 ^ numInnerEdges) * numInnerEdges))
const innerEdges = defineInnerEdges(width, height);
const combinations = Math.pow(2, numInnerEdges);

console.log(numInnerEdges, innerEdges.length);


const svgs = new Array(combinations).fill().map((v,i) => {
	i % 100 ? null : console.log(i);
	return makeSVGInstance();
});

innerEdges.forEach((edge, edgeIndex) => {
	const parity = combinations / Math.pow(2, edgeIndex + 1);
	svgs.forEach((svg, svgIndex) => {
		if (svgIndex & parity) {
			drawLine(svg, edge);
		}
	});
});

svgs.forEach((svg, index) => {
	drawContour(svg, width, height);
	createFile(index, svg.svg());
});







