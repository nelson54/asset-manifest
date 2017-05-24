"use strict";

const _ = require('lodash');
const defaults = require('../defaults');
const packpath = require('./packpath');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const findConfig = require('find-config');

module.exports = class Configuration {

    static fromObject(object) {
        return new Promise(()=>{
            return new Configuration(object);
        });
    }

    static fromFile(configPath) {
        configPath = configPath || defaults.configFileName;
        let packageRoot = packpath.parent();
        configPath = findConfig(configPath);

        let stat = fs.statSync(configPath);

        let config;

        if(stat.isFile()) {
            config = require(configPath)
        } else {
            config = require(path.join(configPath, defaults.configFileName))
        }

        config.packageRoot = packageRoot;


        return new Configuration(_.merge(defaults, config));
    }

    constructor(config) {
        if (config != null && !_.isObject(config)) {
            throw new Error('Configuration constructor can only by empty or an object');
        }

        this.config = _.merge(defaults, config);
    }

    getPackageRoot() {
        return this.config.packageRoot;
    }

    getGeneratedPath() {
        return this.config.generatedPath;
    }

    getGeneratedFile() {
        return this.config.generatedFile;
    }

    getAssetRoot() {
        return this.config.assetRoot;
    }
};