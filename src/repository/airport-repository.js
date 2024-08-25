const {Airport}=require("../models/index");
const {Op}=require("sequelize");

class AirportRepository{

    async createAirport({name,cityId,address}){
        try {
            const airport=await Airport.create({name,cityId,address});
            return airport;
        } catch (error) {
            console.log("something went wrong at repository layer");
            throw {error};
        }
    }

    async deleteAirport(airportId){
        try {
            const airport=await Airport.destroy({
                where:{
                    id:airportId,
                }
            })
            return true;
        } catch (error) {
            console.log("something went wrong at repository layer");
            throw {error};
        }
    }

    async updateAirport(data,airportId){
        try {
            const airport=await Airport.update(data,{
                where:{
                    id:airportId,
                }
            });
            return this.getAirport(airportId);
        } catch (error) {
            console.log("something went wrong at repository layer");
            throw {error};
        }
    }

    async getAirport(airportId){
        try {
            // console.log()
            const airport=await Airport.findByPk(airportId);
            return airport;
        } catch (error) {
            console.log("something went wrong at repository layer");
            throw {error};
        }
    }

    async getAll({name}){
        try {
            if(!name)name="";
            const airports=await Airport.findAll({
                where:{
                    name:{
                        [Op.like]:`${name}%`,
                    }
                }
            });
            return airports;
        } catch (error) {
            console.log("yo");
            console.log("something went wrong at repository layer");
            throw {error};
        }
    }
}

module.exports=AirportRepository;