const HtmlWebPackPlugin = require('html-webpack-plugin');
const path  = require('path');
module.exports = {
    context: __dirname,
    entry:'./src/index.js',
    output:{
        path: path.resolve(__dirname, 'dis'),
        filename: 'main.js',
        publicPath: '/',
    },
    devServer:{
        historyApiFallback: true
    },
    module:{
        rules: [
            {
                test:/\.js$/,
                use: 'babel-loader',
            }
        ]
    },
    plugin: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html'
        })
    ]
}