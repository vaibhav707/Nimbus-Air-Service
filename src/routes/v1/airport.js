const express = require("express");
const router = express.Router();

const {AirportController} = require("../../controllers/index");

router.post('/airport', AirportController.create);
router.get('/airport/:id', AirportController.get);
router.get('/airport', AirportController.getAll);
router.patch('/airport/:id', AirportController.update);
router.delete('/airport/:id', AirportController.destroy);

module.exports = router;