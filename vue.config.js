module.exports = {
    publicPath: "/",
    // publicPath: "/screen",
    devServer: {
        open: true,
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: { colors: true },
        // prot: 3000,
        proxy: {
            '/api': {
                target: 'http://139.159.210.185:9010/',
                // pathRewrite: {'^/api' : '/api'},
                //changeOrigin: true,     // target是域名的话，需要这个参数，
                secure: false,          // 设置支持https协议的代理
            }
        }
    }
}
