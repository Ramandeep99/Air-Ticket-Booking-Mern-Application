import express from "express";
import {  userRegisterGet , userRegisterPost ,userLoginPost, userController ,logout_get , searchflight , bookflight ,payment , bookingDetail } from "../controllers/userControllers.js";
import currentUser from '../middleware/userVerification.js'

const user_router = express();


// router.get('/profile' ,currentUser, adminProfile);

// router.get('/login' , adminLoginGet);

user_router.get('/register' , userRegisterGet);

user_router.post('/register' , userRegisterPost);

user_router.post('/login' , userLoginPost);

user_router.get("/" , currentUser, userController);

user_router.get("/logout" ,currentUser, logout_get);

user_router.post("/searchflight" ,currentUser, searchflight);

// to get flight that is selected by user for booking
user_router.get("/bookflight/:id" ,currentUser, bookflight);

// to make payment by user from bookticket page
user_router.get("/payment/:id" ,currentUser, payment);

// to find booking tickets of a user
user_router.get("/bookingDetail/:id" ,currentUser, bookingDetail);


export default user_router;



