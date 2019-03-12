# Traditional multi-page configuration based on webpack4

> SCSS ES6

- 基于 `webpack4` 的多页面传统配置 `【非SPA】`
- 公共模块配置在 `config/webpack.base.js` 中配置，单独打包，在所有入口共享
- 公共(静态)模板，可以放在 `src/templates` 文件夹中，在 `src/views` 文件夹中有引用样例， [详情点击](https://github.com/jantimon/html-webpack-plugin#options)
- 项目中使用了 `jQuery` 和 `lodash` 作为依赖项，不需要的可以自行去除

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://webpack.github.io/).
