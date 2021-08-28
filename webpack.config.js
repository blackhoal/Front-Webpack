const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    // entry : 시작 관리
    entry : './src/index.js', 
    // output : 만들어지는 최종 파일을 내보내는 옵션
    output : {
        filename : 'main.js',
        path : path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            // use: ["style-loader", "css-loader"],
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
          {
            test: /\.jpg$/,
            use: ["file-loader"],
          },
          {
            test: /\.png$/,
            use: ["file-loader"],
          },
        ],
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : './index.html',
        }),
        new MiniCssExtractPlugin({
            filename : "common.css",
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        static: {
          directory: path.resolve(__dirname, "dist"),
        },
        port: 8070,
    },
}