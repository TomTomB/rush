/* eslint-env es6 */

'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function createWebpackConfig({ production }) {
  const webpackConfig = {
    // Documentation: https://webpack.js.org/configuration/mode/
    mode: production ? 'production' : 'development',
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [require.resolve('style-loader'), require.resolve('css-loader')],
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ],
    },
    entry: {
      app: path.join(__dirname, 'lib', 'index.js'),

      // Put these libraries in a separate vendor bundle
      vendor: ['react', 'react-dom'],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name]_[contenthash].js',
      clean: true,
    },
    performance: {
      // This specifies the bundle size limit that will trigger Webpack's warning saying:
      // "The following entrypoint(s) combined asset size exceeds the recommended limit."
      maxEntrypointSize: 250000,
      maxAssetSize: 250000,
    },
    devServer: {
      port: 4200,
    },
    devtool: production ? undefined : 'source-map',
    plugins: [
      // See here for documentation: https://github.com/jantimon/html-webpack-plugin
      new HtmlWebpackPlugin({
        template: 'assets/index.html',
      }),
    ],
  };

  return webpackConfig;
}

module.exports = createWebpackConfig;
