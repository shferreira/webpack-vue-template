const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  context: path.resolve(__dirname, "app"),
  entry: [ "./main.js" ],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.js",
  },
  plugins: [
    new ExtractTextPlugin("app.css"),
    new UglifyJsPlugin(),
    new OptimizeCSSPlugin({ safe: true }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
      minify: { collapseWhitespace: true },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        exclude: /(node_modules)/,
        options: {
          extractCSS: true,
          loaders: {
            js: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
                plugins: [
                  "@babel/plugin-proposal-optional-chaining",
                  "@babel/plugin-transform-runtime",
                ],
              },
            },
            file: "file-loader",
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"],
          plugins: [
            "@babel/plugin-proposal-optional-chaining",
            "@babel/plugin-transform-runtime",
          ],
        },
      },
      {
        test: /\.stylus$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: "file-loader",
      },
      {
        test: /\.ya?ml$/,
        loader: "json-loader!yaml-loader",
      },
    ],
  },
  stats: {
    modules: false,
    children: false,
  },
};
