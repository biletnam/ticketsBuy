let mysql = require("mysql");



class DB {
    constructor(){
        this.con = mysql.createConnection({
            host: "localhost",
            user: "user",
            password: "user",
            database : "mainairport"
        });
    }
    // eslint-disable-next-line no-unused-vars
    findAvailableFlights(userFlightWish, callback){
        let sql = `select 
                        FlightTypeId as flightId, FlightTypeId as 'key',  departureAirport.NameAirport as airportDeparture, arrivalAirport.NameAirport as airportArrival, 
                        departureAirport.City as cityDeparture, arrivalAirport.City as cityArrival,
                        NameAirlines, DATE_FORMAT(DataLastFlight, '%H:%i') as timeDeparture, DATE_FORMAT(ADDTIME(DataLastFlight, TimeFlightType),'%H:%i') as timeArrival,
                        airplanes.NumberOfSeats - currentFlight.NumberSoldTickets as ticketsAvailable, price as ticketPrice
                    from 
                        mainairport.flighttypes
                    inner join mainairport.airports as arrivalAirport on 
                        flighttypes.AirportArrival=arrivalAirport.AirportId
                    inner join  mainairport.airports as departureAirport on 
                        flighttypes.AirportDeparture=departureAirport.AirportId
                    inner join  mainairport.airplanesflight as currentFlight on 
                        flighttypes.AirplaneId=currentFlight.AirplaneId
                    inner join  mainairport.airplanes as airplanes on 
                        currentFlight.NameAirplane=airplanes.NameAirplane
                    where 
                        (departureAirport.City="${userFlightWish.inputFrom}" OR departureAirport.Country="${userFlightWish.inputFrom}")
                        AND
                        (arrivalAirport.City="${userFlightWish.inputWhere}" OR arrivalAirport.Country="${userFlightWish.inputWhere}")
                        AND
                        ((TIMESTAMPDIFF(DAY,DatalastFlight,DATE_FORMAT('${userFlightWish.dateFrom}',GET_FORMAT(DATE,'JIS')))+1) % FlightFrequency = 0)
                        AND
                        ( airplanes.NumberOfSeats- currentFlight.NumberSoldTickets > 0)`;
        this.con.connect((err) => {
            if (err) throw err;
            this.con.query(sql, (err,results)=>{
                if (err) throw err;
                try {
                    if (results[0].flightId) {
                        results.map((result,i)=>{
                            results[i] = JSON.parse(JSON.stringify(result));
                            results[i].airlinesLogoLink =  `/images/airlines/${result.NameAirlines}.png`;

                        });
                    }
                } catch(e){
                    results = [];
                }
                console.log("Result from BD: " + results);
                this.close();
                callback(results);
            });
        });

    }
    // TODO rewrite routes due to function bellow return canBeBooked value
    // eslint-disable-next-line no-unused-vars
    booleanCheckFlightById(id){
        // TODO write sql to get Subtraction between numberOfSeats and numberOfSold
        let sql = "";
        this.con.connect((err) => {
            if (err) throw err;
            this.con.query(sql, (err,result)=>{
                if (result > 0) {
                    // TODO write sql to update NumbersOfSold to NumberOfSold-1
                    let sql2 = "";
                    this.con.query(sql2, (err,res)=>{
                        if (err) throw err;
                        console.log(res);
                        this.close();
                        return true;
                    });
                } else {
                    this.close();
                    return false;
                }
            });
        });

    }
    // eslint-disable-next-line no-unused-vars
    sendPassengerData(pasFlightObj, callback){
        // TODO insert passengers data into tables
        let sql = "";
        this.con.connect((err) => {
            if (err) throw err;
            this.con.query(sql, (err, res)=>{
                let bookedSuccessfully = true;
                if (err) bookedSuccessfully = false;
                console.log(res);
                this.close();
                callback(bookedSuccessfully);
            });
        });

    }
    close(){
        this.con.destroy();
    }
}

module.exports = DB;
