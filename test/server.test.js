let chai = require("chai");
let mocha = require("mocha");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);
describe("/GET homepage", () => {
    before(() => server.listen());
    after( ()=> server.close());


    it("it should GET homepage", function(done) {
        chai.request("http://localhost:8080")
            .get("/")
            .end(function (err, res){
                res.statusCode.should.to.equal(200);
                res.text.should.to.equal('Hello world!');
                done();
            });
    });


});