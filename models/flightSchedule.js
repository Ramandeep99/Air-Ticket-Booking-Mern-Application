import mongoose from "mongoose"

const flightSchema = mongoose.Schema({
    FlightNo : String,
    From : String,
    To : String,
    Date_ : String,
    TakeOff_Time : String,
    Duration:String,
    Fare:String,
    createdAt : {
        type : Date,
        default : new Date()
    },
    expireAt: Date
});



const flightData = mongoose.model("flightModel" , flightSchema)

export default flightData;

