//jshint esversion:6
const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // removes old dynamically generated file when re-building
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //extracts CSS into its own file on build
const HtmlWebpackPlugin = require('html-webpack-plugin'); //inserts dynamically generated filenames into html
const fse = require('fs-extra'); //for working with websites containing multiple html files

const postCSSPlugins = [
require('postcss-import'),
require('postcss-mixins'),
require('postcss-simple-vars'),
require('postcss-nested'),
require('postcss-hexrgba'),
require('autoprefixer'),
];

class RunAfterCompile {
apply(compiler) {
    compiler.hooks.done.tap('Copy images', () => {
        fse.copySync('./app/assets/images', './docs/assets/images')
    });
}
}

//apply HtmlWebpackPlugin to each html file
let pages = fse.readdirSync('./app').filter((file) => {
    return file.endsWith('.html');
}).map((page) => {
    return new HtmlWebpackPlugin({
        filename: page,
        template: `./app/${page}`
    });
});

let cssConfig =  {
    test: /\.css$/i, 
    use: [
        'css-loader',{
            loader: 'postcss-loader',
            options: {
                plugins: postCSSPlugins
            }
        }
    ]
};

let config = {
    entry: './app/assets/scripts/App.js',
    plugins: pages,
    module: {
        rules: [
           cssConfig,
           {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react','@babel/preset-env']
                }
            }
        }
        ]
    }
};

if (currentTask === 'dev') {

    cssConfig.use.unshift('style-loader');
    config.output = {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    };

    config.devServer = {
        
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        host: '0.0.0.0', //use my IPv4 address to view on web browser...allows any PC (or phone) on the network to see the dev page
        port: 3000
      };

      config.mode = 'development';

}else if(currentTask === 'build') {
    cssConfig.use.unshift(MiniCssExtractPlugin.loader);
    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs')
    };

    config.mode = 'production';
    config.optimization = {
        splitChunks: {
            chunks: 'all'
        }
    };
    config.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
        new RunAfterCompile()
        );
    postCSSPlugins.push(require('cssnano'));
}

module.exports = config;