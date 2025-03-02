const { generateDtsBundle } = require('dts-bundle-generator');
const fs = require('fs');

const options = [
	{
		filePath: './src/index.ts',
		output: {
			noBanner: true
		}
	}
];

const dts = generateDtsBundle(options);
fs.writeFileSync('./dist/index.d.ts', dts[0]);
