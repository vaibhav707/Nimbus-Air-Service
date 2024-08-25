const {AirportService}=require("../services/index");

const airportService=new AirportService();

const create=async (req,res)=>{
    try {
        const airport=await airportService.createAirport(req.body);
        return res.status(201).json({
            data:airport,
            success:true,
            message:"successfully created the airport",
            err:{},
        });
    } catch (error) {
        console.log("Something went wrong at controller layer due to"+error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"unable to create the airport",
            err:error,
        });
    }
};

const destroy=async (req,res)=>{
    try {
        const response=await airportService.deleteAirport(req.params.id);
        return res.status(200).json({
            data:response,
            success:true,
            message:"successfully deleted the airport",
            err:{},
        });
    } catch (error) {
        console.log("Something went wrong at controller layer due to"+error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"unable to delete the airport",
            err:error,
        });
    }
};

const update=async (req,res)=>{
    try {
        // console.log(req.query,req.params.id)
        const airport=await airportService.updateAirport(req.body,req.params.id);
        return res.status(200).json({
            data:airport,
            success:true,
            message:"successfully updated the airport",
            err:{},
        });
    } catch (error) {
        console.log("Something went wrong at controller layer due to"+error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"unable to update the airport",
            err:error,
        });
    }
};

const get=async (req,res)=>{
    try {
        const airport=await airportService.getAirport(req.params.id);
        return res.status(200).json({
            data:airport,
            success:true,
            message:"successfully fetched the airport",
            err:{},
        });
    } catch (error) {
        console.log("Something went wrong at controller layer due to"+error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"unable to fetch the airport",
            err:error,
        });
    }
};

const getAll=async (req,res)=>{
    try {
        const airport=await airportService.getAll(req.query);
        return res.status(200).json({
            data:airport,
            success:true,
            message:"successfully fetched the airports",
            err:{},
        });
    } catch (error) {
        console.log("Something went wrong at controller layer due to"+error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"unable to fetch the airports",
            err:error,
        });
    }
};

module.exports={
    create,
    destroy,
    update,
    get,
    getAll
}