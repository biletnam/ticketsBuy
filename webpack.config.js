require("webpack");


module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname + "/public/build/",
        publicPath: "build/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test:/\.js$/,
                loader: "babel-loader?presets[]=es2015&presets[]=react",
                exclude: [/node_modules/, /public/],
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/],
                query: {
                    presets: ["es2015", "react", "stage-0", "stage-1"],
                    "plugins": ["emotion"]
                }
            },
            {
                test:/\.css$/,
                loader: "style-loader!css-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test:/\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif",
            },
            {
                test:/\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png",
            },
            {
                test:/\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg",
            },
            {
                test:/\.svg$/,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml",
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ],
    }
};