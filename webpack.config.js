const path = require('path')
const hwp = require('html-webpack-plugin')
// const webpack = require('webpack')
const Dotenv = require('dotenv-webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const port = 7077
module.exports = {
    mode: 'development',
    entry: { index: path.resolve(__dirname, "src", "index.js") },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
        }
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].bundle.js',
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /node_modules\/(?!antd\/).*/,
                    name: "vendors",
                    chunks: "all",
                },
                // This can be your own design library.
                antd: {
                    test: /node_modules\/(antd\/).*/,
                    name: "antd",
                    chunks: "all",
                },
            },
        },
        runtimeChunk: {
            name: "manifest",
        },
    },
    devtool: "source-map",
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router-dom': 'ReactRouterDOM'
    },
    devServer: {
        port: port,
        host: '127.0.0.1',
        disableHostCheck: true,
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
                                    'primary-color': '#D75246',
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
                favicon: 'public/favicon.svg'
            }
        ),
        // new BundleAnalyzerPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'REACT_APP_PORT': JSON.stringify(process.env.REACT_APP_PORT)
        //     }
        // }),
        new Dotenv()
    ]
}
