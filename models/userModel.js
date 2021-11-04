import mongoose from "mongoose"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    Name : String,
    email : String,
    password : String,
    tokens: [{
        token:{
            type:String,
            required:true
        }
    }],
    createdAt : {
        type : Date,
        default : new Date()
    }
});


userSchema.pre("save" , async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

// generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id : this._id.toString()} , process.env.SECRETKEY);
            
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
}




const userData = mongoose.model("userModel" , userSchema)

export default userData;

