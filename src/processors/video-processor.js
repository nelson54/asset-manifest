"use strict";
const BaseProcessor = require('./base-processor');

module.exports = class VideoProcessor extends BaseProcessor {
    constructor (config){
        super(config);
    }

    process (asset){
        if (asset.type == 'video') {
            asset.path = '../dist/assets/video/'
        }
    }
};