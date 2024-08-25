const {ClientErrors}=require("../utils/error_succes_code");

const validateCreateFlight=(req,res,next)=>{
    if(
        !req.body.flightNumber ||
        !req.body.airplaneId ||
        !req.body.departureAirportId ||
        !req.body.arrivalAirportId ||
        !req.body.arrivalTime || 
        !req.body.departureTime || 
        !req.body.price
    ){
        return res.status(ClientErrors.BAD_REQUEST).json({
            data:{},
            success:false,
            message:"Invalid resquest body for creating flight",
            err:'Missing mandatory properties to create flight',
        });
    }
    next();
}

module.exports=validateCreateFlight;