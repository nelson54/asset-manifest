const _ = require('lodash');
const path = require('path');
const fs = require('fs');

let buildPath = (asset) => {
    let requirePath = path.join(asset.path, asset.name)
        .replace(/\\/g, '/');
    return `require('${requirePath}');`;
};

module.exports = class AssetWriter {
    constructor(config) {
        this.config = config;
        this.paths = [];

        this.generatedFolder = path.join(process.cwd(), this.config.getGeneratedPath());
        this.generatedFilePath = path.join(this.generatedFolder, this.config.getGeneratedFile());
    }

    add(asset) {
        if(asset.write) {
            this.paths.push(buildPath(asset));
        }
    }

    prepareForWrite() {

        if(!this.outputDirectoryExists()) {
            fs.mkdirSync(this.generatedFolder);
        }

        if(this.outputFileExists()) {
            fs.unlinkSync(this.generatedFilePath);
        }
    }

    outputDirectoryExists() {
        try {
            fs.accessSync(this.generatedFolder);
            return true;
        } catch(e) {
            return false;
        }
    }

    outputFileExists() {
        try {
            fs.accessSync(this.generatedFilePath);
            return true;
        } catch(e) {
            return false;
        }
    }

    write() {
        this.prepareForWrite();

        fs.writeFileSync(this.generatedFilePath, this.toString())
    }

    toString() {
        return this.paths.join('\n');
    }
};