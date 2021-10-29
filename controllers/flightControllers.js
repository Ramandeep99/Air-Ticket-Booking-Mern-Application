import express from "express";
import flightData from '../models/flightSchedule.js'


export const getflights = async (req, res) => {


    if (req.user) {
        const flights = await flightData.find().sort({ Date_: 'asc' });
        
        res.send(flights)
    }
    else {
        res.status(400).json({ "error": "Please Login first." })
    }
}

export const addflight = async (req, res) => {

    try {
        const flightDetail = new flightData(req.body)

        // console.log(flightDetail.expiresAt)

        await flightDetail.save();

        res.status(200).json({ flight: flightDetail });

    }
    catch (error) {
        res.status(400).json({ error })
    }
}
