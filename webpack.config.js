const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

var config = {
   entry: './src/main.js',
   output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
      sourceMapFilename: 'bundle.js.map'
   },
   // generate source map for debugging
   devtool: 'source-map',
   // default Webpack dev server config
   devServer: {
      inline: true,
      port: 9000,
      hot: true,
      contentBase: './public'
   },
   module: {
        // React/Babel ES6 loader
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader'],
                include: /flexboxgrid/
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
   },
   plugins: [
       // create HTML index file dynamically 
       new HtmlWebpackPlugin({
           title: 'Mes Photos',
           filename: 'index.html',
           template: './src/index.html',
           // inject compiled bundle
           files: {
               js: ['bundle.js']
           }
        }),
        new webpack.DefinePlugin({
            'FACEBOOK_APP_ID': JSON.stringify(process.env.FACEBOOK_APP_ID || '116569408989417'),
            'ROLLBAR_TOKEN': JSON.stringify(process.env.ROLLBAR_TOKEN)
        })
    ]
}

module.exports = config;