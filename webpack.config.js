// webpack.config.js

import { resolve } from "path";

const entry = "./src/index.js";
const output = {
  filename: "bundle.js",
  path: resolve(__dirname, "dist"),
};

export default {
  entry,
  output,
  module: {
    rules: [
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
        test: /\.(png|jpg|gif)$/i,
        type: "asset/resource",
      },
      // Ajoutez d'autres règles de chargement au besoin...
    ],
  },
  plugins: [
    new DefinePlugin({
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    }),
    // ... autres plugins
  ],
  // Autres configurations Webpack...
};
