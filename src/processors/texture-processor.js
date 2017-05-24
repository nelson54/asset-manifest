"use strict";
const BaseProcessor = require('./base-processor');

module.exports = class TextureProcessor {
    constructor (){

    }

    process (asset){
        if (asset.type == 'audio') {
            asset.path = '../dist/assets/'
        }
    }
};