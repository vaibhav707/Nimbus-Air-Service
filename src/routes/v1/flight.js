const express=require("express");
const router=express.Router();

const {FlightController}=require("../../controllers/index");
const flightValidation=require("../../middleware/index");

router.post('/flights',
    flightValidation.flightCreateValidation, 
    FlightController.create
);
router.get('/flights/:id',FlightController.get);
router.get('/flights',FlightController.getAll);
router.patch('/flights/:id',FlightController.update);

module.exports=router;