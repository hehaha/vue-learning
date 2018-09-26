module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        ws: true,
        changeOrigin: true
      },
      '/v1': {
        target: 'http://127.0.0.1:5000',
        ws: true,
        changeOrigin: true
      },
    }
  }
}
