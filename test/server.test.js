let chai = require("chai");
let mocha = require("mocha");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);
describe("/GET homepage", () => {
    it("it should GET homepage", (done) => {
        chai.request("http://localhost:8080")
            .get("/")
            .end((err, res) => {
                res.statusCode.should.to.equal(200);
                res.text.should.to.equal('Hello world!');
                done();
            });
    });
});