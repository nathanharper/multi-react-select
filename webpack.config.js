const path = require('path');
const commander = require('commander');

commander
    .version('0.1.0')
    .option('--analyze', 'Display bundle analysis')
    .parse(process.argv);

const plugins = [];

if (commander.analyze) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    plugins.push(
        new BundleAnalyzerPlugin({
            generateStatsFile: true,
        })
    );
}

module.exports = {
    mode: process.env.NODE_ENV,
    watch: true,
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname) + '/dist',
        filename: 'multi-react-select.js',
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
    plugins,
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.jsx'],
    },
    optimization: {
        minimize: true,
    },
    context: __dirname,
};
