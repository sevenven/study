const { formatDate } = require('@npm/utils');

class Core {
	constructor() {
		this.version = '1.0.0';
	}

	getInfo() {
		return {
			version: this.version,
			time: formatDate(new Date())
		};
	}
}

module.exports = Core;
