const path = require('path'),
    webpack = require('webpack');
process.traceDeprecation = true;
module.exports = {
    context: path.resolve(__dirname, 'src/frontend'),
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        'babel-polyfill',
        'webpack/hot/only-dev-server',
        './app.js'
    ],
    output: {
        path: path.resolve(__dirname, 'distr/public/js'),
        filename: 'bundle.js',
        publicPath: path.resolve(__dirname, 'distr/public')
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query:
                {
                    presets:['es2015', 'react', 'stage-2']
                }
            },
            {
                test: /\.sass$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};