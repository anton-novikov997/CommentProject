import path from 'path';
import { Configuration } from 'webpack';

import Dotenv from 'dotenv-webpack';

import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin = require('html-webpack-plugin');
import MiniCssExtractPlugin = require('mini-css-extract-plugin');

interface Environment {
  production: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

export default (env: Environment, argv: { mode: string }): Configuration => {
  const isDevelopment = argv.mode === 'development';
  const config: Configuration = {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: (resPath: string) =>
                    Boolean(resPath.includes('.module.')),
                  localIdentName: isDevelopment
                    ? '[path][name][local]--[hash:base64:1]'
                    : '[hash:base64:8]',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|woff2|woff|ttf)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'img',
                publicPath: 'img',
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                icon: true,
                svgoConfig: {
                  plugins: [
                    {
                      name: 'convertColors',
                      params: {
                        currentColor: false,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './public/index.html',
      }),
      new MiniCssExtractPlugin(),
      new CleanWebpackPlugin(),
      new Dotenv({
        path: './.env.development',
      }),
    ],
  };
  if (isDevelopment) {
    const devServerConfig: DevServerConfiguration = {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3003,
      open: true,
      hot: true,
    };
    config.devServer = devServerConfig;
  }

  return config;
};
