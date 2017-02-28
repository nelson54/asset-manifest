let AssetManifest = require('../src/asset-manifest');

let assetManifest = new AssetManifest('./test/asset-manifest.config.json');
assetManifest.run();