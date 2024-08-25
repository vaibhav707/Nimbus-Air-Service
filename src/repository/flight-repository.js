const {Flight}=require("../models/index");
const {Op}= require("sequelize");


class FlightRepository{

    #createFilter(data){
        let filter={};
        if(data.arrivalAirportId){
            filter.arrivalAirportId=data.arrivalAirportId;
        }
        if(data.departureAirportId){
            filter.departureAirportId=data.departureAirportId;
        }
        let pricefilter=[];
        if(data.minPrice){
            pricefilter.push({price:{[Op.gte]:data.minPrice}});
        }
        if(data.maxPrice){
            pricefilter.push({price:{[Op.lte]:data.maxPrice}});
        }
        if(pricefilter.length>0)Object.assign(filter,{[Op.and]:pricefilter});
        return filter
    }

    async createFlight(data){
        try {
            const flight=await Flight.create(data);
            return flight;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw {error};
        }
    }

    async getFlight(flightId){
        try {
            const flight=await Flight.findByPk(flightId);
            return flight;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw {error};
        }
    }

    async getAllFlight(filter){
        try {
            const filterdata=this.#createFilter(filter);
            const flight=await Flight.findAll({
                where: filterdata,
            });
            return flight;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw {error};
        }
    }

    async update(flightId,data){
        try {
            await Flight.update(data,{
                where:{
                    id:flightId,
                },
            });
            return await this.getFlight(flightId);
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw {error};
        }
    }

}

module.exports=FlightRepository;