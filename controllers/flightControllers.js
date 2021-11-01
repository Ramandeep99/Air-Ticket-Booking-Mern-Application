import express from "express";
import flightData from '../models/flightSchedule.js'

var firstValue = "2012-05-12".split('-');
var secondValue = "2014-07-12".split('-');

var firstDate = new Date();
firstDate.setFullYear(firstValue[0], (firstValue[1] - 1), firstValue[2]);

var secondDate = new Date();
secondDate.setFullYear(secondValue[0], (secondValue[1] - 1), secondValue[2]);


const combineDateAndTime = function (date, time) {
    timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Jan is 0, dec is 11
    var day = date.getDate();
    var dateString = '' + year + '-' + month + '-' + day;
    var combined = new Date(dateString + ' ' + timeString);

    return combined;
};


export const getflights = async (req, res) => {

    if (req.user) {
        const flights = await flightData.find().sort({ Date_: 'asc', Time : 'asc'});
        var arr = []
        flights.forEach( async (flight) => {

            var currentDateTime = new Date();

            // to get date in format of comparison
            var firstValue = flight.Date_.split('/');
            var firstDate = new Date();
            firstDate.setFullYear(firstValue[2], (firstValue[1] - 1), firstValue[0]);

            // to get time in format of comparison
            var time = flight.Time.split(':')
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
