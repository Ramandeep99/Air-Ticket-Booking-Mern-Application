import express from "express";
import {  userRegisterGet , userRegisterPost ,userLoginPost, userController ,logout_get } from "../controllers/userControllers.js";
import currentUser from '../middleware/userVerification.js'

const user_router = express();


// router.get('/profile' ,currentUser, adminProfile);

// router.get('/login' , adminLoginGet);

user_router.get('/register' , userRegisterGet);

user_router.post('/register' , userRegisterPost);

user_router.post('/login' , userLoginPost);

user_router.get("/" , currentUser, userController);

user_router.get("/logout" ,currentUser, logout_get);

// router.get("/usercheck" ,currentUser, usercheck);

export default user_router;



