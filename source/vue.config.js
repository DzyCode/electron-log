module.exports = {
    outputDir: '../lib',
    publicPath: './',
    chainWebpack: config => {
        config
        .output
            // .path('../lib')
            .filename('[name].js')
        // config.entry('index')
        // .add('./src/background.ts')
        // .end()
    },
    configureWebpack: {
        target: 'electron-renderer',
    }
}