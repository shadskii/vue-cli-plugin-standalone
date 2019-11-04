module.exports = api => {
  api.extendPackage({
    scripts: {
      'build:standalone': 'vue-cli-service build:standalone'
    },
    // dependencies: {
    //   'vue-router-layout': '^0.1.2'
    // }
  })
}