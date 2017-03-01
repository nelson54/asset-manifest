let RequireAssetManifest = require('../src/require-asset-manifest');

let assetManifest = new RequireAssetManifest('./test/asset-manifest.config.json');
assetManifest.run("./test/data/manifest.json");