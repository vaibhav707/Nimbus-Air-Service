const {AirplaneService}=require("../services/index");

const {ClientErrors,ServiceErrors,SuccessCodes}=require("../utils/error_succes_code");

const airplaneService=new AirplaneService();

const get=async (req,res)=>{
    try {
        const airplane=await airplaneService.get(req.params.id);
        return res.status(SuccessCodes.OK).json({
            data:airplane,
            success:true,
            message:"successfully fetched the airplane",
            err:{},
        });
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to fetched the airplane",
            err:error,
        });
    }
}

module.exports={
    get,
}
