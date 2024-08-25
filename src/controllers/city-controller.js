const {CityService}=require("../services/index");

const cityService=new CityService();

//post(method) -> /city ,data in body
const create=async (req,res)=>{
    try {
        const city=await cityService.createCity(req.body);
        return res.status(201).json({
            data :city,
            success:true,
            message:"successfully created a city",
            err:{}
        });
    } catch (error) {
        console.log("Something went wrong at controller layer due to"+error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to create the city",
            err: error
        });
    }
}

const createBulk=async (req,res)=>{
    try {
        let data=req.body.name.map((name)=>({name}));
        data=JSON.stringify(data);
        data=JSON.parse(data);

        const response=await cityService.createBulkCities(data);
        return res.status(201).json({
            data :null,
            success:true,
            message:"successfully created a cities",
            err:{}
        });
    } catch (error) {
        console.log("Something went wrong at controller layer due to"+error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to create the cities",
            err: error
        });
    }
}

// delete (method)-> /city/:id
const destroy=async (req,res)=>{
    try {
        const response=await cityService.deleteCity(req.params.id);
        return res.status(200).json({
            data :response,
            success:true,
            message:"successfully deleted a city",
            err:{}
        });
    } catch (error) {
        console.log("Something went wrong at controller layer due to"+error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to delete the city",
            err: error
        });
    }
}

// patch (method) -> /city/:id + data in body
const update=async (req,res)=>{
    try {
        const city=await cityService.updateCity(req.params.id,req.body);
        return res.status(200).json({
            data :city,
            success:true,
            message:"successfully deleted a city",
            err:{}
        });
    } catch (error) {
        console.log("Something went wrong at controller layer due to"+error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to update the city",
            err: error
        });
    }
}

//get (method) -> /city/:id
const get=async (req,res)=>{
    try {
        const city=await cityService.getCity(req.params.id);
        return res.status(200).json({
            data :city,
            success:true,
            message:"successfully fetched a city",
            err:{}
        });
    } catch (error) {
        console.log("Something went wrong at controller layer due to"+error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"unable to fetch the city",
            err: error
        });
    }
}

const getAll=async (req,res)=>{
    try{
        const cities=await cityService.getAll(req.query);
        return res.status(200).json({
            data:cities,
            success:true,
            message:"successfully fetched the cities",
            err:{}
        });
    }catch(error){
        return res.status(500).json({
            data:{},
            success:false,
            message:"unable to fetch the cities",
            err: error
        });
    }
}

const getCityAirports=async (req,res)=>{
    try{
        const airports=await cityService.getCityAirport(req.params.id);
        return res.status(200).json({
            data:airports,
            success:true,
            message:"successfully fetched the airports",
            err:{}
        });
    }catch(error){
        return res.status(500).json({
            data:{},
            success:false,
            message:"unable to fetch the airports",
            err: error
        });
    }
}

module.exports={
    create,
    createBulk,
    get,
    update,
    destroy,
    getAll,
    getCityAirports,
}