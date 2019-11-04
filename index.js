
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const chainWebpack = (config) => {
  config.plugin("html").tap(args => {
    args[0].inlineSource = ".(js|css)$";
    return args;
  });

  ["images", "media", "fonts", "svg"].forEach(ruleName => {
    const rule = config.module.rule(ruleName);
    rule.uses.clear();
    rule
      .use("url-loader")
      .loader("url-loader")
      .tap(() => {
        return {
          limit: true
        };
      });
  });
}

const configureWebpack = () => {
  return {
    plugins: [
      new HtmlWebpackInlineSourcePlugin()
    ]
  }
}

const configureApi = (api) =>{
  api.configureWebpack(config => {
    return configureWebpack(config);
  });

  api.chainWebpack(config =>{
    chainWebpack(config);
  });
};

module.exports = (api, options) => {
  api.registerCommand(
    "build:standalone",
    {
      description: "Builds a standalone html file",
      usage: "vue-cli-service build:standlone"
    },
    args => {
      configureApi(api);
      api.service.run("build", args);
    }
  );
};
module.exports.defaultModes = {
  "build:standalone": 'production'
};