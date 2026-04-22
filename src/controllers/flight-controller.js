const { StatusCodes } = require('http-status-codes');

const { FlightService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { redis } = require('redis');

const client = redis.createClient();
client.connect();

client.on("error", (err) => {
    console.error("Redis error:", err);
});
/**
 * POST : /flights 
 * req-body {
 *  flightNumber: 'UK 808',
 *  airplaneId: 'a380',
 *  departureAirportId: 12,
 *  arrivalAirportId: 11,
 *  arrivalTime: '11:10:00',
 *  departureTime: '9:10:00',
 *  price: 2000
 *  boardingGate: '12A',
 *  totalSeats: 120
 * }
 */
async function createFlight(req, res) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.data = flight;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getAllFlights(req, res) {
    try {
        const { source, destination } = req.query;

        // Apply caching ONLY for Delhi → Mumbai
        if (source === "Delhi" && destination === "Mumbai") {
            const cacheKey = `flights:${source}:${destination}`;

            // 1. Check cache
            const cachedData = await client.get(cacheKey);

            if (cachedData) {
                console.log("Cache hit ✅");
                SuccessResponse.data = JSON.parse(cachedData);
                return res
                    .status(StatusCodes.OK)
                    .json(SuccessResponse);
            }

            console.log("Cache miss ❌");

            // 2. Fetch from DB
            const flights = await FlightService.getAllFlights(req.query);

            // 3. Store in cache (5 min expiry)
            await client.setEx(cacheKey, 300, JSON.stringify(flights));

            SuccessResponse.data = flights;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
        }

        // Normal flow (no cache for other routes)
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;

        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);

    } catch(error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

/**
 * POST : /flights/:id 
 * req-body {}
 */
async function getFlight(req, res) {
    try {
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = flight;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function updateSeats(req, res) {
    try {
        console.log(req.body);
        const response = await FlightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats, 
            dec: req.body.dec
        });
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}
