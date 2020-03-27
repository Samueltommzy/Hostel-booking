const request = require("supertest");
const app = require("../../index");
const chai = require("chai");
const expect = chai.expect;

describe("Test all booking endpoints", function(){
    it("Should search for room based on number of guests", function(done){
            request(app).get("/api/v1/room/search?no_of_guests=2").then(function(res){
            expect(res.status).to.equal(200)
            expect(res.body).to.have.property("data");
            done();
        }).catch(function(error){
            return done(error);
        });  
    });
     
    it("Should book a new room", function(done){
        request(app).post("/api/v1/room/book").send({
            room_id:3,
            no_of_guests:2,
            check_in_date:"26/03/2020",
            check_out_date:"28/03/2020",
            selected_beds:[1,2]
        }).then(function(res){
            expect(res.status).to.equal(200)
            expect(res.body).to.have.property("data");
            done();
        }).catch(function(error){
            return done(error);
        })    
        
    })
})