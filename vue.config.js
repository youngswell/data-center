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
                target: 'http://139.9.1.197:9002/',
                // pathRewrite: {'^/api' : '/api'},
                //changeOrigin: true,     // target是域名的话，需要这个参数，
                secure: false,          // 设置支持https协议的代理
            }
        }
    }
}
