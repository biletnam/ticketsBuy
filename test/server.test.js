let chai = require("chai");
let mocha = require("mocha");
let chaiHttp = require("chai-http");
let server = require("../server");
var expect = require("chai").expect;

chai.use(chaiHttp);
describe("/GET homepage", () => {
    after( ()=> server.close());


    it("it should return statusCode", function(done) {
        chai.request("http://localhost:8080")
            .get("/")
            .end(function (err, res){
                expect(res.statusCode).to.equal(200);
                done();
            });
    });


});