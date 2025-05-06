// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

// grab the default values
const config = getDefaultConfig(__dirname);

// allow .cjs files to be resolved
config.resolver.sourceExts.push('cjs');

// disable the unstable exports-only check (if you’re hitting an exports field error)
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
