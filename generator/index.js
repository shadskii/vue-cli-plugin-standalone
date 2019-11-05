module.exports = api => {
  api.extendPackage({
    scripts: {
      'build:standalone': 'vue-cli-service build:standalone',
      'serve:standalone': 'vue-cli-service serve:standalone'
    }
  });
}