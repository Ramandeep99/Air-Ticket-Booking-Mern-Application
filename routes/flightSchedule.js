import express from "express";
import currentUser from '../middleware/userVerification.js'
import { getflights , addflight } from "../controllers/flightControllers.js";

const flight_router = express();

flight_router.get('/getflight' ,currentUser, getflights);

flight_router.post('/addflight' ,currentUser, addflight);

// router.get('/login' , adminLoginGet);

// router.get('/register' , adminRegisterGet);

// router.post('/register' , adminRegisterPost);

// router.post('/login' , adminLoginPost);

// router.get("/" ,currentUser, userController);

// router.get("/logout" ,currentUser, logout_get);

// router.get("/usercheck" ,currentUser, usercheck);

export default flight_router;
