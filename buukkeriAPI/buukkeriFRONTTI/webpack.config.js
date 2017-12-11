var packageJSON = require('./package.json');
var path = require('path');
var webpack = require('webpack');
var express = require('express');
var app = express();
var path = require('path')


const PATHS = {
		  build: path.join(__dirname, 'target', 'classes', 'META-INF', 'resources', 'webjars', packageJSON.name, packageJSON.version)
		};




module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: PATHS.build,
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    module: {

			devServer: {
				historyApiFallback:true
},
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]

    }
		
};
