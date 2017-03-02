const fs = require('fs');
const path = require('path');
const _ = require('lodash');

function processAssets(manifest) {
    let assets = [];
    manifest.assets.forEach( (asset)=> {
        asset.extensions.forEach((extension) => {
            let copy = _.clone(asset);
            delete copy.extensions;
            copy.name += `.${extension}`;
            assets.push(copy);
        })
    })

    manifest.assets = assets;
}

module.exports = class Manifest {

    static create(config, manifest) {
        let manifestPath = path.join(process.cwd(), manifest);
        let contents = fs.readFileSync(manifestPath);
        let json = JSON.parse(contents);
        processAssets(json);
        return new Manifest(json, config);
    }

    constructor(manifest, config) {
        this.manifest = manifest;
        this.config = config;
    }

    getAssets() {
        return this.manifest.assets;
    }

    apply(func) {
        this.getAssets().forEach(func);

        return this;
    }
};
