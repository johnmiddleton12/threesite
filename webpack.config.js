const path = require('path');

module.exports = {
    mode: 'development',                // only for development
    entry: './src/index.js',
    // devtool: 'inline-source-map',       // only for development
    devServer: {                        // only for development
        static: './dist',
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpg|mtl|obj)$/i,
                type: 'asset/resource',
            },
        ],
    },
};
