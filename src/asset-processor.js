let DefaultProcessor = require('./processors/default-processor');

module.exports = class AssetProcessor {

    constructor(config) {
        this.config = config;
        this.processors = [new DefaultProcessor(config)]
    }

    add(processor) {
        this.processors.push(processor);
    }

    process(asset) {
        this.processors
            .forEach((processor) => processor.process(asset))
    }
};