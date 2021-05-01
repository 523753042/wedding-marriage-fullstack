module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/wedding' : '/',
  devServer: {
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/*': {
        target: "http://www.xtybusiness.cn",
        changeOrigin: true,
        secure: false,
      },
    }

  }
};
