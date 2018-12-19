
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

// numInnerEdges = (width - 1) * height + (height - 1) * width = 2 * width * height - width - height
// Runtime is O( (2 ^ numInnerEdges) * numInnerEdges))

console.log('defining inner edges');
const innerEdges = defineInnerEdges(width, height);
const combinations = Math.pow(2, innerEdges.length);
console.log(`There are ${innerEdges.length} inner edges and ${combinations} combinations`);

//const svgBar = new progressBar('creating svgs [:bar] :percent :elapsed', { total: combinations, width: 30 });
// const svgs = new Array(combinations).fill().map((v,i) => {
// 	svgBar.tick();
// 	return makeSVGInstance();
// });

// innerEdges.forEach((edge, edgeIndex) => {
// 	const parity = combinations / Math.pow(2, edgeIndex + 1);
// 	svgs.forEach((svg, svgIndex) => {
// 		if (svgIndex & parity) {
// 			drawLine(svg, edge);
// 		}
// 		innerEdgeBar.tick();
// 	});
// });

const fileBar = new progressBar('creating files [:bar] :percent :elapsed', { total: combinations, width: 30});
// const innerEdgeBar = new progressBar('drawing edges [:bar] :percent :elapsed', { total, width: 30 });

for (let svgIndex = 0; svgIndex < combinations; svgIndex++) {
	const svg = makeSVGInstance();
	let parity = 1;

	innerEdges.forEach((edge, edgeIndex) => {
		if (svgIndex & parity) {
			drawLine(svg, edge);
		}
		parity *= 2;
	});

	drawContour(svg, width, height);
	createFile(svgIndex, svg.svg(),  (err) => {
		if (err) {
			console.err(err);
		}
	});
	fileBar.tick();
}

// svgs.forEach((svg, svgIndex) => {

// });

// const fileBar = new progressBar('creating files [:bar] :percent :elapsed', { total: svgs.length, width: 30});
// svgs.forEach((svg, index) => {
// 	drawContour(svg, width, height);
// 	createFile(index, svg.svg(), (err) => {
// 		if (err) {
// 			console.err(err);
// 		}
// 		fileBar.tick();
// 	});
// });







