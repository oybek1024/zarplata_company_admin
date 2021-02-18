const path = require('path')
const hwp = require('html-webpack-plugin')
const webpack = require('webpack')
// const port = process.env.REACT_APP_PORT || 3000
module.exports = {
    mode: 'production',
    entry: { index: path.resolve(__dirname, "src", "index.js") },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[hash].js',
        publicPath: "/"
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router-dom': 'ReactRouterDOM'
    },
    devServer: {
        port: 7077,
        host: '0.0.0.0',
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|j?g|svg|gif)?$/,
                use: 'file-loader'
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    'primary-color': '#0E0D23',
                                    'link-color': '#1890ff',
                                    'border-radius-base': '3px',
                                    'border-color-base': '#bab4b4'
                                },
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new hwp(
            {
                template: 'public/index.html',
                favicon: 'public/favicon.jpg'
            }
        ),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
    ]
}
