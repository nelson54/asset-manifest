const BaseProcessor = require('./base-processor');

module.exports = class TextureProcessor extends BaseProcessor {
    constructor (config){
        super(config);
    }

    process (asset){
        if (asset.type == 'audio') {
            asset.path = '../dist/assets/'
        }
    }
};