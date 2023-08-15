const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

// eslint-disable-next-line no-undef
module.exports = {
    mode: 'production',
    entry: './src/SharePlace.js',
    output: {
        filename: 'app.js',  //file name that should be generated
        path: path.resolve(__dirname, 'dist', 'my-place'),  //dirname- absolute path to current file adding assets and
        publicPath: 'dist/my-place/'                         //scripts to the path  --to generate output in scripts folder
    },
    // devtool: 'cheap-source-map'          //for getting original code in sources in browser for debugging
    // devServer: {
    //     contentBase: './'      //To tell dev server where root html file can be found
    // }                          // By default here only

    plugins: [           //Provides various optimizations on the generated output
        new CleanPlugin.CleanWebpackPlugin()  //In browser if file same -stored in cache of browser as not changed
                                       //In order to browser to load new file, delete previous file and create new 
                                        //file to load                                                     
    ]

};