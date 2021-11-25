import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv'
import adminRouter from './routes/adminRoutes.js'
import cookieParser from "cookie-parser";
import flight_router from "./routes/flightSchedule.js";
import user_router from './routes/userRoutes.js'

const port = process.env.PORT || 2000;

const app = express();

dotenv.config({ path: './config.env' });

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//use cors to allow cross origin resource sharing
app.use(
    cors({  
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );


// local connection to database
mongoose.connect('mongodb://localhost:27017/bookingdb' ,{
    useUnifiedTopology: true, useNewUrlParser: true       
})

app.listen(port, () => { console.log(`App running from ${port} port`) })

// connect to Atlas
// const dbURI = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.sky9c.mongodb.net/bookingdb?retryWrites=true&w=majority`
// mongoose.connect(dbURI, {
//     useUnifiedTopology: true, useNewUrlParser: true
// }).then((res) => app.listen(port, () => { console.log(`App running from ${port} port`) }))
//     .catch((error) => console.log(error.message));



//  routes
app.use('/admin/',adminRouter)
app.use('/admin/' , flight_router)
app.use('/user/',user_router)


