// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require('nativewind/metro');
//
// const config = getDefaultConfig(__dirname)
//
// module.exports = withNativeWind(config, { input: './global.css' })
//
const {getDefaultConfig} = require("expo/metro-config");
const {withNativeWind} = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Wrap your default configuration with withNativeWind
module.exports = withNativeWind(config, {input: "./global.css"});