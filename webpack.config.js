const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


module.exports = (env) => {
  return {
    mode: env.production ? "production" : "development",
    entry: { "assets/index": "./src/index.js" },
    output: {
      path: __dirname + "/dist",
      filename: "[name].js",
      clean: true,
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "src/index.html", minify: true }),
      new MiniCssExtractPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            env.production ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            env.production ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },
            // Compiles Sass to CSS using node-sass for vr-reset
            {
              loader: "sass-loader",
              options: {
                implementation: require("node-sass"),
                sassOptions: {
                  fiber: false,
                },
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        // `...`,
        new CssMinimizerPlugin(),
      ],
    },
  };
};
