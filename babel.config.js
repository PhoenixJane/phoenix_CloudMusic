// 项目发布阶段需要用到的babel插件
const prodPlugin = []
if (process.env.NODE_ENV === 'production') {
  prodPlugin.push('transform-remove-console')
}
module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', { modules: false }]
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 发布产品时候的插件数组
    ...prodPlugin,
    '@babel/plugin-syntax-dynamic-import'
  ]
}
