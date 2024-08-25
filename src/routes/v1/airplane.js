const express=require("express");
const router=express.Router();

const {AirplaneController}=require("../../controllers/index");

router.get('/airplane/:id',AirplaneController.get);

module.exports=router;