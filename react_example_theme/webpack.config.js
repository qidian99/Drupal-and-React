const path = require('path');
const isDevMode = process.env.NODE_ENV !== 'production';


// The base path of your Drupal development server. This is what you would
// normally navigate to in your browser when working on the site.
const PROXY = 'http://drupal-8-9-1.dd:8083/';
// The absolute path to the directory, relative to the PROXY path above, to the
// directory that contains the files that you want webpack-dev-server to NOT
// pass on to Drupal.
// For example, if your .js file is normally accessed via http://a.com/src/script.js
// and you want webpack-dev-server to handle all the .js files in the src
// directory set this to '/src/'.
const PUBLIC_PATH = '/themes/react_example_theme/js/dist_dev/';

const config = {
  entry: {
    main: [
      "react-hot-loader/patch",
      "./js/src/index.jsx"
    ]
  },
  devtool: (isDevMode) ? 'source-map' : false,
  mode: (isDevMode) ? 'development' : 'production',
  output: {
    path: isDevMode ? path.resolve(__dirname, "js/dist_dev") : path.resolve(__dirname, "js/dist"),
    filename: '[name].min.js',
    publicPath: PUBLIC_PATH
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'js/src'),
        options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      }
    ],
  },
  devServer: {
    port: 8181,
    hot: true,
    https: true,
    writeToDisk: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    // Settings for http-proxy-middleware.
    proxy: {
      '/': {
        index: '',
        context: () => true,
        target: PROXY,
        publicPath: PUBLIC_PATH,
        secure: false,
        // These settings allow Drupal authentication to work, so you can sign
        // in to your Drupal site via the proxy. They require some corresponding
        // configuration in Drupal's settings.php.
        changeOrigin: true,
        xfwd: true
      }
    }
  },
};

module.exports = config;
