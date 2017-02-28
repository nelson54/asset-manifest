const fs = require('fs');
const path = require('path');

module.exports = class Manifest {

    static create(config) {
        let path = config.getManifestPath();

        let contents = fs.readFileSync(path);
        let json = JSON.parse(contents);
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