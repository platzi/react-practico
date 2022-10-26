const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  console.log("Nombre: ", env.name); // 'Nombre de la app'
  console.log("Version: ", env.version); // 'Entorno de la app'
  console.log("Entorno: ", env.environment); // 'Entorno de la app'
  return {
    entry: "./src/index.tsx",
    mode: "development",
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts|jsx|js)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
        {
          test: /\.(css|scss)$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          type: "asset",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@components": path.resolve(__dirname, "src/components/"),
        "@containers": path.resolve(__dirname, "src/containers/"),
        "@pages": path.resolve(__dirname, "src/pages/"),
        "@routes": path.resolve(__dirname, "src/routes/"),
        "@styles": path.resolve(__dirname, "src/styles/"),
        "@icons": path.resolve(__dirname, "src/assets/icons/"),
        "@logos": path.resolve(__dirname, "src/assets/logos/"),
        "@hooks": path.resolve(__dirname, "src/hooks/"),
        "@services": path.resolve(__dirname, "src/services/"),
        "@context": path.resolve(__dirname, "src/context/"),
        "@redux": path.resolve(__dirname, "src/redux/"),
        "@serevices": path.resolve(__dirname, "src/services/"),
        "@core": path.resolve(__dirname, "src/core/"),
        "@helpers": path.resolve(__dirname, "src/helpers/"),
      },
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: "/",
    },
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "./index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
    devServer: {
      historyApiFallback: true,
    },
    devtool: "source-map",
  };
};
