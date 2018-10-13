const path = require('path');

// process.noDeprecation = true;

module.exports = {
    mode: process.env.NODE_ENV,
    watch: true,
    entry: './index.jsx',
    output: {
        path: path.resolve(__dirname) + '/dist',
        filename: 'react-multiselect.js',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: true,
                },
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
        ],
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx'],
    },
    optimization: {
        minimize: true,
    },
    context: __dirname,
};
