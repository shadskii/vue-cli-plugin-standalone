# vue-cli-plugin-standalone

___Package your whole app into a single file___

[Vue CLI 3](https://github.com/vuejs/vue-cli) plugin to create standalone html builds. This plugin adds the `build:standalone` script to your vue project. This command packages an entire app into a single `.html` file. All `js` and `css` are inlined and all media is base64 encoded and inlined.

## How To
Create Vue App

```bash
npm install -g @vue/cli
vue create my-app
cd my-app
```

Add the plugin to your vue app.

```bash
vue add standalone
```

## Usage
```bash
npm run build:standalone # Creates a single file build of your app
```

```bash
npm run serve:standalone # Serves your app with assets inlined
```


## License
MIT