const sinon = require("sinon");
const sinonTest = require("sinon-test");
const test = sinonTest(sinon);
const chai = require("chai");
const expect = chai.expect;
const roomControllers = require("../../controllers/roomController");

describe("Room controllers", function(){
    let status,send,res;
    // status = sinon.stub();
    // send = sinon.spy();
    // res = {send,status};
    // status.returns(res);
    beforeEach(()=>{
       status = sinon.stub();
       send = sinon.spy();
       res = {send,status};
       status.returns(res);
    })
    let req = {
        body:{
            room_type:"Standard double room 2 beds",
            number_of_beds:2,
            price_per_bed :100000,
            booked_beds:[1],
            available_beds:[1,2],
            room_config_id:5
        },
        params:{
            id:3,
            config_id:5
        }
    }
    it("Should create a room",async function(){  
        const stubValue = {
            id:1,
            room_type:"Standard double room 2 beds",
            number_of_beds:2,
            price_per_bed :100000,
            booked_beds:[1],
            available_beds:[1,2],
            room_config_id:5

        }
        const stub = sinon.stub(roomControllers,"createRoom").returns(stubValue);
        const response = await roomControllers.createRoom(req,res);
        expect(stub.calledOnce).to.be.true;
        expect(response).to.deep.equal(stubValue);
    })
    it("should return all rooms",async function(){
        const stubValue = [{
            id:1,
            room_type:"Standard double room 2 beds",
            number_of_beds:2,
            price_per_bed :100000,
            booked_beds:[1],
            available_beds:[1,2],
            room_config_id:5
            },
            {
            id:2,
            room_type:"Standard double room 2 beds",
            number_of_beds:2,
            price_per_bed :100000,
            booked_beds:[1],
            available_beds:[1,2],
            room_config_id:5
            }
       ]
        const stub = sinon.stub(roomControllers,"getAllRooms").returns(stubValue);
        const response = await roomControllers.getAllRooms(req,res);
        expect(stub.calledOnce).to.be.true;
        expect(response).to.be.instanceOf(Array);
        expect(response).to.deep.equal(stubValue);
    })
    it("should return all available rooms",async function(){
        const stub = sinon.stub(roomControllers,"getAllAvailableRooms");
        await roomControllers.getAllAvailableRooms(req,res);
        expect(stub.calledOnce).to.be.true;
    });
    it("should get room by id",async function(){
        const id =1;
        const stubValue = {
            id:1,
            room_type:"Standard double room 2 beds",
            number_of_beds:2,
            price_per_bed :100000,
            booked_beds:[1],
            available_beds:[1,2],
            room_config_id:5

        } 
        const stub = sinon.stub(roomControllers,"getRoomById").withArgs(id).resolves(stubValue);
        const response = await roomControllers.getRoomById(req,res);
        // expect(stub.calledWith(req)).to.be.true;
        expect(response).to.deep.equal(stubValue);
    });
    it("should get room by type",async function(){
        const stub = sinon.stub(roomControllers,"getRoomsByType")
        await roomControllers.getRoomsByType(req,res);
        expect(stub.calledOnce).to.be.true;
    })
    it("should delete a room",async function(){
        const stub = sinon.stub(roomControllers,"deleteRoom");
        await roomControllers.deleteRoom(req,res);
        expect(stub.calledOnce).to.be.true;
    })
})
