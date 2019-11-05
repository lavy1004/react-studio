const { injectBabelPlugin } = require('react-app-rewired');
const { 
  addDecoratorsLegacy, // decorator를 사용할 수 있도록 해주는 config
  disableEsLint,
  override,
} = require("customize-cra");

module.exports = {
  webpack: override(
      disableEsLint(),
      addDecoratorsLegacy()
  ),
}