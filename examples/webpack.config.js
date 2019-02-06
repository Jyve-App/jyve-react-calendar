const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

console.log(path.resolve(__dirname, '..', 'src/styles.less'))

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, '../examples/index.js'),
  output: {
    path: path.join(__dirname, '../examples/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(css)|(less)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: {
                'primary-color': '#a89be8'
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {}
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@src': path.resolve(__dirname, '../src/index.js')
    }
  },
  devServer: {
    contentBase: './examples/dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../examples/index.html'),
      inject: 'body'
    }),
    new webpack.NormalModuleReplacementPlugin(/node_modules\/antd\/lib\/style\/index\.less/, path.resolve(__dirname, '..', 'src/styles.less'))
  ]
}
