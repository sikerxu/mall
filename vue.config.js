module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                // @是已经在CLI3中内部配置过的别名
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}

