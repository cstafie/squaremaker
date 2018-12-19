
const progressBar = require('progress');

const { 
	defineInnerEdges,
	createFile,
	SVG,
	drawLine,
	drawContour
} = require('./lib');

const {
	width,
	height
} = require('./config');

// numInnerEdges = (width - 1) * height + (height - 1) * width = 2 * width * height - width - height
// Runtime is O( (2 ^ numInnerEdges) * numInnerEdges))

const innerEdges = defineInnerEdges(width, height);
const combinations = Math.pow(2, innerEdges.length);
console.log(`There are ${innerEdges.length} inner edges and ${combinations} combinations`);

const fileBar = new progressBar('creating files [:bar] :percent :elapsed', { total: combinations, width: 30});

const createSvgs = async () => {
	for (let svgIndex = 0; svgIndex < combinations; svgIndex++) {
		const svg = new SVG();
		let parity = 1;

		innerEdges.forEach((edge, edgeIndex) => {
			if (svgIndex & parity) {
				svg.drawLine(edge);
			}
			parity *= 2;
		});

		svg.drawContour(width, height);
		try {
			await createFile(svgIndex, svg.toString());
		} catch (err) {
			console.log(err);
		}
		fileBar.tick();
	}
}

createSvgs();










