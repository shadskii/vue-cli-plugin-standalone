
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const chainInlineSource = (config) => {
  config.plugin("html").tap(args => {
    args[0].inlineSource = ".(js|css)$";
    return args;
  });
}

const chainInlineAssets = (config) => {
  ["images", "media", "fonts", "svg"].forEach(ruleName => {
    const rule = config.module.rule(ruleName);
    rule.uses.clear();
    rule
      .use("url-loader")
      .loader("url-loader")
      .tap(() => {
        return {
          limit: 0
        };
      });
  });
}

const configInlineSource = () => {
  return {
    plugins: [
      new HtmlWebpackInlineSourcePlugin()
    ]
  }
}

module.exports = (api, options) => {
  api.registerCommand(
    "build:standalone",
    {
      description: "Builds a standalone html file",
      usage: "vue-cli-service build:standlone"
    },
    args => {
      api.configureWebpack(config => {
        return configInlineSource();
      });
      api.chainWebpack(config => {
        chainInlineSource(config);
        chainInlineAssets(config);
      });
      api.service.run("build", args);
    }
  );
  api.registerCommand(
    "serve:standalone",
    {
      description: "Serves a standalone html file",
      usage: "vue-cli-service serve:standlone"
    },
    args => {
      api.chainWebpack(config => {
        chainInlineAssets(config);
      });
      api.service.run("serve", args);
    }
  );
};
module.exports.defaultModes = {
  "build:standalone": 'production',
  "serve:standalone": "development"
};