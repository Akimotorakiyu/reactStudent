import * as path from "path";
import * as webpack from "webpack";

import * as HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

// 分析参数
const modeIndex = process.argv.findIndex(ele => {
  return ele == "--mode";
});

let isDevelopment = true;
if (modeIndex >= 0) {
  isDevelopment = process.argv[modeIndex + 1] !== "production";
} else {
  throw "未定义--mode， 默认mode";
}

const plugins: webpack.Plugin[] = [];

if (isDevelopment) {
  plugins.push(
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["dist"]
    })
  );
}

plugins.push(
  new HtmlWebpackPlugin({
    template: "public/index.html"
  })
);

if (isDevelopment) {
  plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  );
}
const config: webpack.Configuration = {
  entry: "./dev/index.ts",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "dist",
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.md?$/,
        use: "raw-loader",
        exclude: /node_modules/
      },
      {
        test: /\.[tj]sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["transform-class-properties"],
            presets: [
              ["@babel/preset-typescript"],
              ["@babel/preset-react"],
              [
                "@babel/preset-env",
                {
                  //useBuiltIns:false,//default value is false
                  corejs: 3,
                  targets: {
                    ie: "11",
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1"
                  }
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "css-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".jsx", ".tsx"]
  },
  output: {
    filename: "index.js",
    path: path.resolve("dist")
  },
  plugins
};

export default config;
