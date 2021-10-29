import express from "express";
import { usercheck ,logout_get , userController , adminProfile , adminRegisterGet, adminLoginGet ,adminLoginPost ,adminRegisterPost } from "../controllers/adminControllers.js";
import currentUser from '../middleware/userVerification.js'

const router = express();


router.get('/profile' ,currentUser, adminProfile);

router.get('/login' , adminLoginGet);

router.get('/register' , adminRegisterGet);

router.post('/register' , adminRegisterPost);

router.post('/login' , adminLoginPost);

router.get("/" ,currentUser, userController);

router.get("/logout" ,currentUser, logout_get);

router.get("/usercheck" ,currentUser, usercheck);

export default router;
