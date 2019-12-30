module.exports = {
  devServer: {
    port: '8080', // 代理端口
    open: false, // 项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    proxy: {
      '/api': { // 代理api
        target: 'http://localhost:4000', // 服务器api地址
        changeOrigin: true, // 是否跨域
        ws: true, // proxy websockets 持久连接
        pathRewrite: { // 重写路径
          '^/api': ''
        }
      }
    }
  }
}
