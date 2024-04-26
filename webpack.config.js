
module.exports = {
  module: {
    resolve: {
      extensions: [".js", ".jsx"],
    },
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
