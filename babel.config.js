const plugins = []
if (process.env.NODE_ENV === 'production') {
  // 生产版本移除console
  plugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: plugins
}
