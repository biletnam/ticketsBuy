let http = require("http");


let serverWrap = () => {
    let server = http.createServer((req,res) => {
        res.statusCode = 200;
        res.end("Hello world!");
    }).listen(8080);

    exports.close = () =>  server.close();

    exports.listen = () => server.listen(8080);

};

serverWrap();