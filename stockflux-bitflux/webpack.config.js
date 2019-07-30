const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve('src', 'assets', 'js', 'bitflux.js'),
    output: {
        filename: 'bitflux.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'stockflux-bitflux',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                enforce: 'pre',
                use: [
                    { loader: 'eslint-loader' }
                ]
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: [
                    { loader: 'babel-loader' }
                ]
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules', 'bootstrap'),
                    path.resolve(__dirname, 'node_modules', 'd3fc')
                ],
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.svg$/,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules', 'bootstrap'),
                ],
                use: [
                    { loader: 'url-loader' }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                include: [
                    path.resolve(__dirname, 'node_modules', 'bootstrap'),
                ],
                use: [
                    { loader: 'file-loader' }
                ]
            }
        ]
    },
    resolve: {
        symlinks: false
    },
};