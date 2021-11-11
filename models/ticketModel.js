import mongoose from "mongoose"
import flightData from "./flightSchedule.js";
import userData from "./userModel.js";

const ticketSchema = mongoose.Schema({
    user : { type : Object },
    flight : { type : Object },
    createdAt : {
        type : Date,
        default : new Date()
    }
});

// user : { "ref" : 'userData', type : mongoose.Schema.Types.ObjectId },
// flight : { "ref" : 'flightData', type : mongoose.Schema.Types.ObjectId },

const ticketData = mongoose.model("ticketModel" , ticketSchema)

export default ticketData;
