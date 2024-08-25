const {FlightRepository,AirplaneRepository}=require("../repository/index");
const {compareTime}=require("../utils/helper");

class FlightService{

    constructor(){
        this.airplaneRepository=new AirplaneRepository();
        this.flightRepository=new FlightRepository();
    }

    async createFlight(data){
        try {
            if(!compareTime(data.arrivalTime,data.departureTime)){
                throw {error:"Arrival time cannot be greater then departure time"};
            }
            const airplane=await this.airplaneRepository.get(data.airplaneId);
            const flight=await this.flightRepository.createFlight({
                ...data,totalSeats:airplane.capacity
            });
            return flight;
        } catch (error) {
            console.log("something went at service layer");
            throw {error};
        }
    }

    async getFlight(flightId){
        try {
            const flight=await this.flightRepository.getFlight(flightId);
            return flight; 
        } catch (error) {
            console.log("something went at service layer");
            throw {error};
        }
    }

    async getAllFlight(data){
        try {
            const flight=await this.flightRepository.getAllFlight(data);
            return flight;
        } catch (error) {
            console.log("something went at service layer");
            throw {error};
        }
    }

    async update(flightId,data){
        try {
            const flight=await this.flightRepository.update(flightId,data);
            return flight;
        } catch (error) {
            console.log("something went at service layer");
            throw {error};
        }
    }
}

module.exports=FlightService;