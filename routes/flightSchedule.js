import express from "express";
import currentUser from '../middleware/userVerification.js'
import { getflights , addflight ,editflight , deleteflight} from "../controllers/flightControllers.js";

const flight_router = express();

flight_router.get('/getflight' ,currentUser, getflights);

flight_router.post('/addflight' ,currentUser, addflight);

flight_router.put('/editflight/:id' ,currentUser, editflight);

flight_router.get('/deleteflight/:id' ,currentUser, deleteflight);

export default flight_router;
