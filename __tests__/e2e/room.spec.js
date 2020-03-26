const request = require("supertest");
const app = require("../../index");
const chai = require("chai");
const expect = chai.expect;

describe("Test all room endpoints", function(){
    it("Should create a new room", function(done){
            request(app).post("/api/v1/rooms").send({
            room_type:"Standard double room 2 beds",
            number_of_beds:2,
	        price_per_bed :100000,
	        booked_beds:[],
	        available_beds:[1,2],
	        room_config_id:5
        }).then(function(res){
            expect(res.status).to.equal(201)
        expect(res.body).to.have.property("data");
        done();
        }).catch(function(error){
            return done(error);
        })    
        
    })
})