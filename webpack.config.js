const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
  entry: {
    index: './src/app.js',
    detail: './src/detail.js'
  },
  output: {
    filename: 'bundle.[contentHash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode:"development",
  plugins:[
    new HtmlWebpackPlugin({
      filename:"index.html",
      template:"./src/template.html"
    }),
    new HtmlWebpackPlugin({
      filename: "detail.html",
      template: "./src/detail.html"
    }),
  	new CleanWebpackPlugin()
  ],
  devServer:{
  	contentBase:'./dist',
  },
  module: {
  	rules: [
  	{
  		test: /\.html$/i,
  		loader: 'html-loader',
  	},
  	{
  		test:/\.css$/,
  		use:['style-loader','css-loader']
  	},
  	{
  		test: /\.(png|svg|jpg|gif)$/,
  		use:{
  			loader: "file-loader",
  			options: {
  				name: "[name].[hash].[ext]",
  				outputPath: "images"
  			}
  		}
  	},
  	{
  		test: /\.js$/,
  		exclude: /node_modules/,
  		use: {
  			loader: "babel-loader",
  			options: {
  				presets: ["@babel/preset-env",]
  			}
  		}
  	}
  	],
  },
};
