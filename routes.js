"use strict";
module.exports = function (app) {

    app.get("/", function(req, res){
        res.sendfile(__dirname + "/public/index.html");
    });

    app.post("/checkFlight", (req, res)=>{

        res.json({"data": "123123"});
    });

};