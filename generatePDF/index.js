const fs = require("fs");

const path = require("path");

function generatePDFAll(bookingId, ticketsId, request) {
    return new Promise((resolve, reject) => {
        generateBarcode(ticketsId, function () {
            generatePDF(bookingId, ticketsId, request, function(err){
                if (err){
                    reject(new Error("Error in generatePDFAll : "+ err.message));
                } else {
                    resolve();
                }
            });
        });
    });
}

function generateBarcode(ticketsId, callback) {
    const bwipjs = require("bwip-js");
    Promise.all(
        ticketsId.map(function (ticket, i) {
            return new Promise(function (resolve, reject) {
                bwipjs.toBuffer({
                    bcid: "code128",       // Barcode type
                    text: `${ticketsId[i]}`,    // Text to encode
                    scale: 1,               // 3x scaling factor
                    height: 8,              // Bar height, in millimeters
                    includetext: false,            // Show human-readable text
                    textxalign: "center",        // Always good to set this
                }, function (err, png) {
                    if (err) {
                        reject();
                    } else {
                        let writeImg = path.join(__dirname, `../public/pdf/ticketsBarcode/${ticketsId[i]}.png`);
                        fs.writeFile(writeImg, png, function (err) {
                            if (err) reject();
                            resolve();
                        });
                    }
                });
            });
        })
    )
        .then(function () {
            callback();
        })
        .catch(function (err) {
            throw err;
        });
}

function generatePDF(bookingId, ticketsId, request,callback) {
    const PDFDocument = require("pdfkit");
    const doc = new PDFDocument();
    let pipePath = path.join(__dirname, `../public/pdf/${bookingId}.pdf`);
    let writeStream = fs.createWriteStream(pipePath);
    doc.pipe(writeStream);
    let passengers = request.body.passengers;
    doc.registerFont("Raleway", path.join(__dirname, "../public/fonts/Raleway-Regular.ttf"));
    let {airportArrival, airportDeparture, cityArrival, cityDeparture, flightId, timeArrival, timeDeparture} = request.body.flight;
    timeDeparture = (+timeDeparture.split(":")[0] - 1 === -1) ? "23" + timeDeparture.split(":")[1] : (+timeDeparture.split(":")[0] - 1) + ":" + timeDeparture.split(":")[1];
    for (let i = 0; i < ticketsId.length; i++) {
        doc.roundedRect(25, 25, 560, 240, 30);
        doc.stroke();
        doc.moveTo(25, 80)
            .lineTo(585, 80)
            .stroke();
        doc.fontSize(20);
        doc.font("Helvetica")
            .text("Boarding Pass", 50, 48);
        let imgPath = path.join(__dirname, `../public/pdf/ticketsBarcode/${ticketsId[i]}.png`);
        doc.image(imgPath, 460, 42);
        doc.fontSize(12);
        doc.font("Helvetica")
            .text("Name:", 50, 108)
            .text("Passport:", 50, 138)
            .text("Ticket:", 50, 168);
        doc.fontSize(15);
        doc.font("Times-Roman")
            .text(`${passengers[i].fName}  ${passengers[i].sName}`, 120, 107)
            .text(`${passengers[i].passportId}`, 120, 137)
            .text(`${ticketsId[i]}`, 120, 167);
        doc.fontSize(12);
        doc.font("Helvetica")
            .text("Flight", 50, 208)
            .text("From", 120, 208)
            .text("To", 220, 208)
            .text("Boarding", 290, 208)
            .text("Arrival", 390, 208);
        doc.moveTo(50, 225)
            .lineTo(430, 225)
            .dash(5)
            .stroke();
        doc.font("Raleway")
            .text(`${flightId}`, 50, 238)
            .text(`${airportDeparture}/${cityDeparture}`, 110, 238)
            .text(`${airportArrival}/${cityArrival}`, 200, 238)
            .text(`${timeDeparture}`, 298, 238)
            .text(`${timeArrival}`, 394, 238);
        if (!(ticketsId.length - 1 === i)) {
            doc.addPage();
        }
    }
    doc.end();
    writeStream.on("finish", function () {
        callback();
    });
}
module.exports = generatePDFAll;