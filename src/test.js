"use strict";

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

let handle = (err, stat) => {
    console.dir(stat);
};

let file = path.join(__dirname, 'asset-manifest.js');

console.log(file);

fs.statAsync(file)
    .then((stat)=> {
        console.dir(stat)
    })
    .error((error)=> {
        console.log(error)
    });
