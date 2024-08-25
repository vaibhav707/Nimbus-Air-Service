const express = require("express");
const bodyparser = require("body-parser");
const axios = require("axios");

const db=require("./models/index");

const ApiRoutes= require("./routes/index.js");

const { PORT , DB_SYNC } = require("./config/serverconfig.js");

const setupAndStartServer = async () => {
    const app = express();

    app.use(express.json());
    app.use(bodyparser.urlencoded({extended:true}));

    app.use('/', async (req, res, next) => {
        try {
            const response = await axios.post("http://localhost:3001/api/v1/isAuthenticate", undefined,
                {
                    headers: {
                        "x-access-token": req.headers["x-access-token"],
                    }
                }
            );
            if (response.data.success){
                next();
            }
        } catch (error) {
            return res.json({
                message:"Unauthorized",
            });
        }
    });
    
    app.use('/api',ApiRoutes);
    app.use('/flightAndSearch/api',ApiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server started at ${PORT}`);

        if(DB_SYNC===true){
            await db.sequelize.sync({ alter: true });
            console.log("Database Synced!");
        }
    
    });
}

setupAndStartServer();