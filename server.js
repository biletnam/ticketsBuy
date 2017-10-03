let http = require("http");


let serverWrap = () => {
    http.createServer((req,res) => {
        res.statusCode = 200;
        res.end("Hello world!");
    }).listen(8080);
};

serverWrap();