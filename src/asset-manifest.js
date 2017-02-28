const Configuration = require('./configuration');
const Manifest = require('./manifest');
const AssetProcessor = require('./asset-processor');
const AssetWriter = require('./asset-writer');
const _ = require('lodash');

module.exports = class AssetManifest {

    constructor (config) {
        this.config = Configuration.fromFile(config);
        this.assetProcessor = new AssetProcessor(this.config);
        this.assetWriter = new AssetWriter(this.config);
    }

    addProcessor(processor) {


        this.assetProcessor.add(processor);
    }

    run() {
        let manifest = Manifest.create(this.config);

        manifest.apply((asset) => {
            this.assetProcessor.process(asset)
        });

        manifest.apply((asset) => {
            this.assetWriter.add(asset)
        });

        this.assetWriter.write();
    }

};