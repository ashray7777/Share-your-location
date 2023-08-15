const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

// eslint-disable-next-line no-undef
module.exports = {
    mode: 'development',
    entry: './src/SharePlace.js',
    output: {
        filename: 'app.js',  //file name that should be generated
        path: path.resolve(__dirname, 'dist', 'result'),  //dirname- absolute path to current file adding assets and
        publicPath: 'dist/result/'                        //scripts to the path  --to generate output in scripts folder
    },
    // devtool: 'cheap-module-eval-source-map'          //for getting original code in sources in browser for debugging
    // devServer: {
    //     contentBase: './'      //To tell dev server where root html file can be found
    // }                          // By default here only
    plugins: [           //Provides various optimizations on the generated output
    new CleanPlugin.CleanWebpackPlugin()
    ]
};