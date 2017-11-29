var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
        "game": [path.resolve(__dirname, "src/app.ts")],
        "game.min": [path.resolve(__dirname, "src/app.ts")]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        libraryTarget: "umd",
        library: "ECS",
        umdNamedDefine: true
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    devtool: "source-map",
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            include: /\.min\.js$/
        })
    ],
    module: {
        rules: [{
            test: /\.ts$/,
            use: [{ loader: "ts-loader" }]
        }]
    }
};
