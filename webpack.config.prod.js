const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = function (env, argv) {
    const isEnvDevelopment = argv.mode === 'development' || !argv.mode;
    const isEnvProduction = argv.mode === 'production';
    return {
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        devtool: isEnvProduction ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',
        entry: {
            index: './src/index.jsx',
            another: './src/another-module.jsx'
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin(),
                new OptimizeCssAssetsPlugin(),
            ],
            splitChunks: {
                chunks: 'all',
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    }
                }
            }
        },
        performance: {
            hints: false
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    enforce: "pre",
                    use: "eslint-loader"
                },
                {
                    test: /\.jsx$/,
                    exclude: /node_moduels/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    include: [path.resolve(__dirname, 'src/index.css'), /node_modules/],
                    //use: ['style-loader', 'css-loader', 'postcss-loader']
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.css$/,
                    exclude: [path.resolve(__dirname, 'src/index.css'), /node_modules/],
                    //use: ['style-loader', 'css-loader?modules', 'postcss-loader']
                    use: [MiniCssExtractPlugin.loader, 'css-loader?modules', 'postcss-loader']
                },
                {
                    test: /\.less$/,
                    include: [path.resolve(__dirname, 'src/styles'), /node_modules/],
                    use: ['style-loader', 'css-loader', 'less-loader']
                },
                {
                    test: /\.less$/,
                    exclude: [path.resolve(__dirname, 'src/styles'), /node_modules/],
                    use: ['style-loader', 'css-loader?modules', 'less-loader']
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: ["file-loader"]
                },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                    loader: "url-loader",
                    options: {
                        limit: 10000
                    }
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "public/index.html",
                title: 'Code Splitting'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash:8].css',
                chunkFilename: '[name].[contenthash:8].chunk.css'
            }),
            new BundleAnalyzerPlugin()
        ],
        resolve: {
            //配置别名，在项目中可缩减引用路径
            alias: {
                '@': path.resolve('src'),
                'favicon': path.resolve('public/hot.ico')
            }
        },
    }
};