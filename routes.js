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

            console.log(data);
            res.json(data);
        });

        /*
        [
            {
                key: "12412",
                flightId: "12412",
                airportArrival : "MUC",
                airportDeparture: "KBP",
                timeDeparture: "18:00",
                timeArrival: "20:15",
                cityDeparture: "Киев",
                cityArrival: "Мюнхен",
                ticketsAvailable: 23,
                ticketPrice: 5230,
                airlinesLogoLink : "/images/airlines/alitalia.png"
            },
            {
                key: "54234",
                flightId: "54234",
                airportArrival : "IEV",
                airportDeparture: "KBP",
                timeDeparture: "12:00",
                timeArrival: "12:50",
                cityDeparture: "Киев",
                cityArrival: "Львов",
                ticketsAvailable: 9,
                ticketPrice: 2500,
                airlinesLogoLink : "/images/airlines/alitalia.png"
            },
            {
                key: "15323",
                flightId: "15323",
                airportArrival : "GOI",
                airportDeparture: "KBP",
                timeDeparture: "09:15",
                timeArrival: "17:50",
                cityDeparture: "Киев",
                cityArrival: "Даболим",
                ticketsAvailable: 10,
                ticketPrice: 12500,
                airlinesLogoLink : "/images/airlines/emirates.png"
            }
        ]
         */

    });
    app.post("/checkFlightById", (req, res)=>{
        let flight = req.body;
        let userReq = new DB();
        flight.canBeBooked = userReq.booleanCheckFlightById(flight.flightId);
        res.json(flight);
    });

    app.post("/sendPassengerData", (req,res)=> {
        let bookingId = generateRandomNumber(100000,0);
        let tickets = [];
        for (let i = 0; i < req.body.flight.personAmount ; i++){
            tickets[i] = generateRandomNumber(10000000000, 0);
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

