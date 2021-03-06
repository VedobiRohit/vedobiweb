const path = require( 'path' );
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

/*-------------------------------------------------*/

module.exports = {

    //  webpack optimisation mode
    mode: ( 'development' === process.env.NODE_ENV ? 'development' : 'production' ),

    entry: 'development' === process.env.NODE_ENV ? [
        './src/index.dev.js', // in development
    ] : [
        './src/index.prod.js', // in production
    ],

    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
            },
            {
                test: /\.(scss|css)$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            },
            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.(jpe?g|png|gif|webp|svg)?$/,
                use: ['file-loader'],
                type: 'asset/resource' 
            },
            {
                test: /\.(woff|woff2|eot|ttf)?$/,
                use: ['file-loader'],
                type: 'asset/resource' 
            },
            {
                test: /\.(mp4|woff|woff2|eot|ttf|otf|svg)?$/,
                use: ['file-loader'],
                type: 'asset/resource' 
            }
        ]
    },

    plugins: [

        new MiniCssExtractPlugin( {
            filename: 'build/styles.css'
        } ),

        new HTMLWebpackPlugin( {
            filename: 'index.html',
            template: path.resolve( __dirname, 'src/index.html' ),
            minify: false,
        } ),

        new CopyWebpackPlugin( {
            patterns: [
                {
                    from: path.resolve( __dirname, 'src/assets' ),
                    to: path.resolve( __dirname, 'dist/assets' )
                }
            ]
        } ),
    ],

    resolve: {
        extensions: [ '.js', '.jsx', '.scss', '.css', '.jpg', '.jpeg', '.png', '.webp', '.mp4', '.svg', '.woff', 'woff2', '.ttf' ],
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,

                vendor: {
                    // chunks: 'all',
                    name: 'vendor',
                    test: /node_modules/,
                }
            }
        }
    },

    devServer: {
        port: 8095,
        historyApiFallback: true,
    },

    devtool: 'source-map'
};