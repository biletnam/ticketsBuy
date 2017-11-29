"use strict";
let generatePDF = require("./generatePDF");
module.exports = function (app) {

    app.get("/", function(req, res){
        res.sendfile(__dirname + "/public/index.html");
    });

    app.post("/findAvailableFlights", (req, res)=>{
        res.json([
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
                airportArrival : "KBP",
                airportDeparture: "IEV",
                timeDeparture: "12:00",
                timeArrival: "12:50",
                cityDeparture: "Киев",
                cityArrival: "Львов",
                ticketsAvailable: 9,
                ticketPrice: 2500,
                airlinesLogoLink : "/images/airlines/alitalia.png"
            }
        ]);
    });
    app.post("/checkFlightById", (req, res)=>{
        //TODO Find By ID from DB
        res.json({
            "canBeBooked" : true,
            "key": "54234",
            "flightId": "54234",
            "airportArrival" : "IEV",
            "airportDeparture": "KBP",
            "timeDeparture": "12:00",
            "timeArrival": "12:50",
            "cityDeparture": "Киев",
            "cityArrival": "Львов",
            "ticketsAvailable": 50,
            "ticketPrice": 2500,
            "airlinesLogoLink" : "/images/airlines/alitalia.png"
        });
    });

    app.post("/sendPassengerData", (req,res)=> {
        // TODO update query to database
        let bookingId = generateRandomNumber(100000,0);
        let tickets = [];
        for (let i = 0; i < req.body.flight.personAmount ; i++){
            tickets[i] = generateRandomNumber(10000000000, 0);
        }
        generatePDF(bookingId,tickets,req)
            .then( ()=> {
                res.json({
                    "bookedSuccessfully" : true,
                    "bookingId" : bookingId
                });
            })
            .catch( (err)=> {
                if (err) alert(err);
            });

    });


};

function generateRandomNumber(max,min) {
    return Math.floor(Math.random() * (max - min) + min);
}