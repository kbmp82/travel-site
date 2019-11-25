//jshint esversion:6
const path = require('path')

const postCSSPlugins = [
require('postcss-import'),
require('postcss-mixins'),
require('postcss-simple-vars'),
require('postcss-nested'),
require('autoprefixer'),
]
module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    },
    mode: 'development',
    // watch: true, --dev server automatically watches so this is not needed
    devServer: {
        
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        host: '0.0.0.0', //use my IPv4 address...allows any PC (or phone) on the network to see the dev page
        port: 3000
      },
      module: {
          rules: [
              {
                  test: /\.css$/i, 
                  use: [
                      'style-loader','css-loader?url=false',{
                          loader: 'postcss-loader',
                          options: {
                              plugins: postCSSPlugins
                          }
                      }
                  ]
              }
          ]
      }
}