const path = require("path");

module.exports = {
  // webpack need to define the input source file and output generated files path
  mode: "development",
  entry: "./src/app.js",

  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "assets", "scripts"),
  },
};
