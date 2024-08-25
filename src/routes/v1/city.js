const express=require("express");
const router=express.Router();

const {CityController}=require("../../controllers/index");

router.post('/city',CityController.create);
router.post('/cities',CityController.createBulk);
router.get('/city/:id',CityController.get);
router.get('/city',CityController.getAll);
router.get('/city_airports/:id',CityController.getCityAirports);
router.patch('/city/:id',CityController.update);
router.delete('/city/:id',CityController.destroy);

module.exports=router;