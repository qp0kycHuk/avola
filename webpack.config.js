const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

const PUBLIC_PATH = path.resolve(__dirname, 'dist')

const htmlWebpackPluginDefaults = {
  scriptLoading: 'blocking',
  inject: 'head'
}

const pages = [
  '404.html', 'account.html', 'auth-step-1.html', 'auth-step-forgotpass.html', 'auth-step-sign-in.html', 'buners.html',
  'filter.html', 'index.html', 'jk-inner.html', 'jk-inner-disabled.html', 'lk-archive.html', 'lk-designing.html', 
  'lk-jk-inner.html', 'lk-none.html', 'lk-object(Доступ запрещен).html', 'lk-object.html', 'lk-object-item.html',
  'lk-request-add.html', 'lk-request-expertiza.html', 'lk-request-podbor.html', 'lk-request-prosmotr.html', 
  'lk-requests-objects.html', 'lk-saved-collections.html', 'lk-statistic.html', 'lk-statistic-object.html', 
  'lk-team.html', 'lk-users.html', 'lk-view.html', 'objects.html'
]

const dialogs = [
  'confirm-modal.html', 'dialog-calculator.html', 'dialog-form-width-dude.html',
  'dialog-width-dude.html', 'filter-help-modal.html', 'lk-modal-profile.html', 
  'lk-user-edit-modal.html', 'lk-users-modal-expertiza.html', 'lk-users-modal-prosmotr.html', 
  'modal-request-add.html', 'new-success-dialog.html', 'phone-request.html'
]

module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src/')

    }
  },
  output: {
    path: PUBLIC_PATH,
    filename: 'index.js',
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.s[ac]ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/style.css", }),
    ...pages.map((name) => new HtmlWebpackPlugin({
      ...htmlWebpackPluginDefaults,
      template: `./src/html_pages/${name}`,
      filename: name
    })),
    new CopyPlugin({
      patterns: [
        { from: "./src/img/", to: "./img/" },
        { from: "./src/js/", to: "./js/" },
        { from: "./src/source/", to: "./source/" },
        ...dialogs.map((name) => ({ from: `./src/html_dialogs/${name}`, to: `./${name}` }))
        // { from: "./src/dialog-small.html", to: "./dialog-small.html" },
        // { from: "./src/dialog-middle.html", to: "./dialog-middle.html" },
        // { from: "./src/dialog-large.html", to: "./dialog-large.html" },
      ],
    }),
  ],
  devServer: {
    contentBase: PUBLIC_PATH,
    compress: false,
    port: 9000,
    historyApiFallback: true,

  },

};
