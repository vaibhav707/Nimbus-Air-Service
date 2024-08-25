const {FlightService}=require("../services/index");


const flightService=new FlightService();

const create=async (req,res)=>{
    try {
        const flight=await flightService.createFlight(req.body);
        return res.status(200).json({
            data:flight,
            success:true,
            message:'successfully created a flight',
            err:{},
        });
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to create a flight",
            err:error
        });
    }
}

const get=async (req,res)=>{
    try {
        const flight=await flightService.getFlight(req.params.id);
        return res.status(200).json({
            data:flight,
            success:true,
            message:'successfully fetched the flight',
            err:{},
        });
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to fetch the flight",
            err:error
        });
    }
}

const getAll=async (req,res)=>{
    try {
        const flights=await flightService.getAllFlight(req.query);
        return res.status(200).json({
            data:flights,
            success:true,
            message:'successfully fetched the flights',
            err:{},
        });
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to fetch the flights",
            err:error
        });
    }
}

const update = async (req,res)=>{
    try {
        const flight=await flightService.update(req.params.id,req.body);
        return res.status(200).json({
            data:flight,
            success:true,
            message:'successfully updated the flight',
            err:{},
        });
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to update the flight",
            err:error
        });
    }
}



module.exports={
    create,
    get,
    getAll,
    update,
}