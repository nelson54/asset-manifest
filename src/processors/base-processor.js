"use strict";
module.exports = class BaseProcessor {
    constructor (config){
        this.config = config;
    }

    process (asset){
        const BaseProcessor = require('./base-processor');

        module.exports = class ImageProcessor extends BaseProcessor {
            constructor (config){
                super(config);
            }

            process (asset){
                if (asset.type == 'audio') {
                    asset.path = '../dist/assets/'
                }
            }
        };
    }
};