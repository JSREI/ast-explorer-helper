const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 获取当前环境
const isProduction = process.env.NODE_ENV === 'production';
// GitHub Pages的基础路径
const baseUrl = isProduction ? '/ast-explorer-helper/' : '/';

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
    publicPath: baseUrl
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]'
              },
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mov)$/i,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    fallback: {
      "crypto": false,
      "stream": false,
      "http": false,
      "https": false,
      "os": false,
      "web3": false,
      "ethereum": false
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
      publicPath: baseUrl
    }),
    new CopyWebpackPlugin({
      patterns: [
        // 复制logo
        { 
          from: 'public/logo.png',
          to: 'logo.png'
        },
        // 复制视频
        {
          from: 'public/videos',
          to: 'videos'
        },
        // 复制多语言文件
        {
          from: 'public/locales',
          to: 'locales'
        }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    hot: true,
    historyApiFallback: true,
    port: 3000,
    host: 'localhost',
    open: true,
    compress: true,
    client: {
      overlay: true,
      progress: true
    }
  }
}; 