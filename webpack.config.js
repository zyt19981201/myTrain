const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (env, argv) {
    const isEnvDevelopment = argv.mode === 'development' || !argv.mode;
    const isEnvProduction = argv.mode === 'production';
    return {
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        devtool: isEnvProduction ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',
        entry: './src/index.jsx',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dists'),
        },
        module: {
            rules: [{
                    test: /\.jsx$/,
                    exclude: /node_moduels/,
                    use: 'babel-loader'
                }, {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
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
                }
            ]
        },
        devServer: {
            contentBase: './dist'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "public/index.html"
            })
        ]
    }
};