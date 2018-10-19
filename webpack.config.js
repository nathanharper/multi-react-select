const path = require('path');
const commander = require('commander');

commander
    .version('0.1.0')
    .option('--analyze', 'Display bundle analysis')
    .option('--watch', 'Watch for changes.')
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
    watch: commander.watch,
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname) + '/dist',
        filename: 'multi-react-select.js',
        library: 'multi-react-select',
        libraryTarget: 'umd',
        publicPath: '/dist/',
        umdNamedDefine: true,
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
        alias: {
            react: path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        },
    },
    optimization: {
        minimize: true,
    },
    context: __dirname,
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'React',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'ReactDOM',
            root: 'ReactDOM',
        },
        'react-select': {
            commonjs: 'react-select',
            commonjs2: 'react-select',
            amd: 'ReactSelect',
            root: 'ReactSelect',
        },
    },
};
