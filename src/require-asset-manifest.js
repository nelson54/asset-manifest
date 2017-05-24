"use strict";
const Configuration = require('./configuration');
const Manifest = require('./manifest');
const AssetProcessor = require('./asset-processor');
const AssetWriter = require('./asset-writer');
const _ = require('lodash');

class RequireAssetManifest {

    constructor (config) {
        this.config = Configuration.fromFile(config);
        this.assetProcessor = new AssetProcessor(this.config);
        this.assetWriter = new AssetWriter(this.config);
    }

    addProcessor(processor) {
        this.assetProcessor.add(processor);
    }

    run(paths) {
        if (_.isArray(paths)) {
            paths.forEach(
                (path) => this.manifest(path))
        } else {
            this.manifest(paths);
        }

        this.assetWriter.write();
    }

    manifest(path) {
        let manifest = Manifest.create(this.config, path);

        manifest.apply((asset) => {
            this.assetProcessor.process(asset)
        });

        manifest.apply((asset) => {
            this.assetWriter.add(asset)
        });
    }
}

module.exports = RequireAssetManifest;