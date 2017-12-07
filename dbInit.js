let mysql = require("mysql");

let con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "user",
    database : "airport"
});

class DB {
    constructor(){
        con.connect((err) => {
            if (err) throw err;
            this.con = con;
        });
    }
    // eslint-disable-next-line no-unused-vars
    findAvailableFlights(userFlightWish){
        // TODO write sql to findAvailableFlights
        let sql = "";
        this.con.query(sql, (err,result)=>{
            if (err) throw err;
            result.key = result.flightId;
            result.airlinesLogoLink = result.airlinesLogoLink || "/images/airlines/alitalia.png";
            this.close();
            return result;
        });
    }
    // TODO rewrite routes due to function bellow return canBeBooked value
    // eslint-disable-next-line no-unused-vars
    booleanCheckFlightById(id){
        // TODO write sql to get Subtraction between numberOfSeats and numberOfSold
        let sql = "";
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
    }
    // eslint-disable-next-line no-unused-vars
    sendPassengerData(pasFlightObj, callback){
        // TODO insert passengers data into tables
        let sql = "";
        this.con.query(sql, (err, res)=>{
            let bookedSuccessfully = true;
            if (err) bookedSuccessfully = false;
            console.log(res);
            this.close();
            callback(bookedSuccessfully);
        });
    }
    close(){
        this.con.destroy();
    }
}

module.exports = DB;
