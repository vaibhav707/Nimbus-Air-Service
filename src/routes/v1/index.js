const express=require("express");
const router=express.Router();

const Cityroute=require("./city");
const Airportroute=require("./airport");
const Flightroute=require("./flight");
const Airplaneroute=require("./airplane");

router.use(Cityroute);
router.use(Airportroute);
router.use(Flightroute);
router.use(Airplaneroute);

module.exports=router;
