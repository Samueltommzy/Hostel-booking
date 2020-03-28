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
	        booked_beds:[1],
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

    it("Should get all available rooms",function(done){
        request(app).get("/api/v1/allrooms").then(function(res){
            expect(res.status).to.equal(200);
            expect(res.body.data).to.be.instanceOf(Array);
            done();
        }).catch(function(error){
            return done(error);
        });
    })
    it("Should get a room by id",function(done){
        request(app).get("/api/v1/rooms/1").then(function(res){
            expect(res.status).to.equal(200);
            done();
        }).catch(function(error){
            return done(error);
        })
    })
    it("Should get all rooms",function(done){
        request(app).get("/api/v1/rooms").then(function(res){
            expect(res.status).to.equal(200);
            expect(res.body.data).to.be.instanceOf(Array);
            done();
        }).catch(function(error){
            return done(error);
        });
    });
    it("Should get room by type",function(done){
        request(app).get("/api/v1/rooms/type/5").then(function(res){
            expect(res.status).to.equal(200);
            expect(res.body.data).to.be.instanceOf(Array);
            done();
        }).catch(function(error){
            return done(error);
        });
    });
    it("Should delete a room",function(done){
        request(app).delete("/api/v1/rooms/26").then(function(res){
            expect(res.status).to.equal(200);
            done();
        }).catch(function(error){
            return done(error);
        });
    })
    
})