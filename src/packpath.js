"use strict";

let fs = require('fs')
    , path = require('path')
    , selfModule = module.parent;

if (typeof fs.existsSync === 'undefined')
    fs.existsSync = path.existsSync; //make Node v0.4 -> v0.8 compatible


function packageFind(paths) {
    if (!paths) return null;

    for (let i = 0; i < paths.length; ++i){
        let dir = path.dirname(paths[i]);
        if (fs.existsSync(path.join(dir, 'package.json')))
            return dir;
    }

    return null;
}

function findParentPaths(selfModule) {
    while(selfModule.id != '.') {
        selfModule = selfModule.parent;
    }
    return selfModule.paths;
}

module.exports.self = function() {
    if (selfModule)
        return packageFind(selfModule.paths);
    else
        return null;
};

module.exports.parent = function() {
    if (selfModule.parent) {

        return findParentPaths(selfModule)[0];
    } else
        return null
};
