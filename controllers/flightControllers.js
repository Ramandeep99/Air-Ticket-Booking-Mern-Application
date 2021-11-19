import express from "express";
import flightData from '../models/flightSchedule.js'



export const getflights = async (req, res) => {

    if (req.user) {
        const flights = await flightData.find().sort({ Date_: 'asc', TakeOff_Time : 'asc'});
        var arr = []
        flights.forEach( async (flight) => {

            var currentDateTime = new Date();

            // to get date in format of comparison
            var firstValue = flight.Date_.split('/');
            var firstDate = new Date();
            firstDate.setFullYear(firstValue[2], (firstValue[1] - 1), firstValue[0]);

            // to get time in format of comparison
            var time = flight.TakeOff_Time.split(':')
            var timeString = time[0] + ':' + time[1] + ':00'

            // combination of date time
            var year = firstValue[2]
            var month = firstValue[1]
            var day = firstValue[0]
            var dateString = '' + year + '-' + month + '-' + day;
            var combined = new Date(dateString + ' ' + timeString);
           
            if (combined < currentDateTime) {

                combined.setDate(combined.getDate() + 1)    
                flight.Date_ = combined.toLocaleDateString()

                await flight.save();

            }
            else {
                arr.push(flight);
            }
        })
        
        res.send(arr)
       
    }
    else {
        res.status(400).json({ "error": "Please Login first." })
    }
}

export const addflight = async (req, res) => {

    try {
        const flightDetail = new flightData(req.body)

        var newDate = flightDetail.Date_.split('-')

        if(newDate[2][0] == '0') {
            newDate[2] = newDate[2].slice(1,2);
        }

        newDate = newDate[2]+'/'+newDate[1]+'/'+newDate[0]
        flightDetail.Date_ = newDate

        await flightDetail.save();

        res.status(200).json({ flight: flightDetail });

    }
    catch (error) {
        res.status(400).json({ error })
    }
}


export const editflight = async (req, res) => {
    // console.log('hello from edit server')
    // console.log(req.params.id)
    try {
        const flightDetail = await flightData.findById(req.params.id)

        flightDetail.FlightNo = req.body.FlightNo
        flightDetail.From = req.body.From
        flightDetail.To = req.body.To
        flightDetail.Date_ = req.body.Date_
        flightDetail.TakeOff_Time = req.body.TakeOff_Time
        flightDetail.Fare = req.body.Fare
        flightDetail.Duration = req.body.Duration


        var newDate = flightDetail.Date_.split('-')

        if(newDate[2][0] == '0') {
            newDate[2] = newDate[2].slice(1,2);
        }

        newDate = newDate[2]+'/'+newDate[1]+'/'+newDate[0]
        flightDetail.Date_ = newDate

        await flightDetail.save();

        res.status(200).json({ flight: flightDetail });

    }
    catch (error) {
        res.status(400).json({ error })
    }
}

export const deleteflight = async (req, res) => {
    // console.log('hello from edit server')
    // console.log(req.params.id)
    try {

        await flightData.findByIdAndDelete(req.params.id)

        res.status(200).json({ msg: "Success!" });

    }
    catch (error) {
        res.status(400).json({ error })
    }
}


export const getsingleflight = async (req, res) => {

    if (req.user) {
        const flight = await flightData.findOne({_id : req.params.id})
        
        res.send(flight)
       
    }
    else {
        res.status(400).json({ "error": "Please Login first." })
    }
}
