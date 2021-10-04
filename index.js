import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import path from "path";
import dotenv from 'dotenv'
const port = process.env.PORT || 2000;
import router from './routes/testing.js'

const app = express();

dotenv.config({ path: './config.env' });

// connect to Atlas
const dbURI = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.sky9c.mongodb.net/bookingdb?retryWrites=true&w=majority`
mongoose.connect(dbURI, {
    useUnifiedTopology: true, useNewUrlParser: true
}).then((res) => app.listen(port, () => { console.log(`App running from ${port} port`) }))
    .catch((err) => console.log(err));


//  routes
app.use('/',router)