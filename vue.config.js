const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/final-project/' // 將 'your-repo-name' 替換為你的 GitHub 儲存庫名稱
    : '/'
})
