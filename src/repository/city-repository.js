const { json } = require("body-parser");
const {City} = require("../models/index");
const {Op} =require("sequelize");

class CityRepository{

    async createCity({name}){
        try{
            const city=await City.create({name});
            return city;
        }catch(error){
            console.log("Something went wrong at repository layer");
            throw {error};
        }
    }

    async createBulkCities(cities){
        try {
            await City.bulkCreate(cities);
            return true;
        } catch (error) {
            console.log("Something went wrong at repository layer");
            throw {error};
        }
    }

    async deleteCity(cityId){
        try{
            await City.destroy({
                where:{
                    id:cityId,
                }
            });
            return true;
        }catch(error){
            console.log("Something went wrong at repository layer");
            throw {error};
        }
    }

    async updateCity(cityId,data){
        try {
            const city=await City.update(data,{
                where:{
                    id:cityId,
                }
            });
            return this.getCity(cityId);
        } catch (error) {
            console.log("Something went wrong at repository layer");
            throw {error};
        }
    }

    async getCity(cityId){
        try {
            const city=await City.findByPk(cityId);
            return city;            
        } catch (error) {
            console.log("Something went wrong at repository layer");
            throw {error};
        }
    }

    async getAll({name}){
        try {
            if(!name)name="";
            const cities=await City.findAll({
                where:{
                    name:{
                        [Op.like]:`${name}%`,
                    }
                }
            });
            return cities;
        } catch (error) {
            console.log("Something went wrong at repository layer");
            throw {error};
        }
    }

    async getCityAirport(cityId){
        try {
            const city= await City.findByPk(cityId);
            const airports=city.getAirports();
            return airports;
        } catch (error) {
            console.log("Something went wrong at repository layer");
            throw {error};
        }
    }
}

module.exports=CityRepository;