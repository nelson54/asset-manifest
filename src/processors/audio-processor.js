"use strict";
const BaseProcessor = require('./base-processor');

module.exports = class AudioProcessor extends BaseProcessor {
    constructor (config){
        super(config);
    }

    process (asset){
        if (asset.type == 'audio') {
            asset.path = '../dist/assets/audio/'
        }
    }
};