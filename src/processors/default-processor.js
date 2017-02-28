const BaseProcessor = require('./base-processor');

module.exports = class DefaultProcessor extends BaseProcessor {
    constructor (config){
        super(config);
    }

    process (asset){
        asset.write = true;
        asset.path = this.config.getAssetRoot();
    }
};