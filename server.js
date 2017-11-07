let http = require("http");
const PORT = process.env.PORT || 8080;

let serverWrap = () => {
    let server = http.createServer((req,res) => {
        res.statusCode = 200;
        res.end("Hello world!");
    }).listen(PORT);

    exports.close = () =>  server.close();

    exports.listen = () => server.listen(PORT);

};

serverWrap();