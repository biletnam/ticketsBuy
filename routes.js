"use strict";
let generatePDF = require("./generatePDF");
let DB = require("./dbInit");
module.exports = function (app) {

    app.get("/", function(req, res){
        res.sendfile(__dirname + "/public/index.html");
    });

    app.post("/findAvailableFlights", (req, res)=>{
        let userReq = new DB();
        userReq.findAvailableFlights(req.body, (data)=>{
            res.json(data);
        });
    });

    app.post("/checkFlightById", (req, res)=>{
        let flight = req.body;
        let userReq = new DB();
        userReq.booleanCheckFlightById(flight.flightId, flight.personAmount, (canBeBooked)=>{
            flight.canBeBooked = canBeBooked;
            res.json(flight);
        });
    });
    app.post("/failedToRegister", (req, res)=>{
        let data = req.body;
        let userReq = new DB();
        userReq.cancelBooking(data.flightId, data.personAmount, ()=>{
            res.json();
        });
    });

    app.post("/sendPassengerData", (req,res)=> {
        let bookingId = generateRandomNumber(100000,0);
        let tickets = [];
        for (let i = 0; i < req.body.flight.personAmount ; i++){
            tickets[i] = generateRandomNumber(2147483646, 0);
            req.body.passengers[i].ticketId = tickets[i];
        }
        let userReq = new DB();
        userReq.sendPassengerData(req.body,(bookedSuccessfully)=>{
            if (bookedSuccessfully){
                generatePDF(bookingId,tickets,req)
                    .then( ()=> {
                        res.json({
                            bookedSuccessfully,
                            "bookingId" : bookingId
                        });
                    })
                    .catch( (err)=> {
                        if (err) alert(err);
                    });
            } else {
                res.json({
                    bookedSuccessfully
                });
            }
        });
    });


};

function generateRandomNumber(max,min) {
    return Math.floor(Math.random() * (max - min) + min);
}

