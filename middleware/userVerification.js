import jwt from 'jsonwebtoken';
import adminData from '../models/adminModel.js';

const requireAuth =  (req,res,next) =>{
    const token = req.cookies.jwtoken;
    // console.log(token);
    if(token){
        jwt.verify(token , process.env.SECRETKEY , async (err , decodedToken) => {
            if (err){
                // console.log(err)
                res.redirect('/admin/login');
            }
            else{

                const user = await adminData.findById(decodedToken._id)
                req.user = user;

                next();
            }
        })
    }
    else{
        // console.log(err)
        res.redirect('/admin/login');
    }

}
// console.log(__dirname)



const currentUser = (req,res,next) =>{
    const token = req.cookies.jwtoken;
    
    req.token = token;
    if(token){
        jwt.verify(token , process.env.SECRETKEY , async (err , decodedToken) => {
            if (err){
                console.log(err)
                res.user = null; 
                // res.redirect('/admin/login'); 
                next();
            }
            else{

                // const userName = async (req,res) =>{
                //     const name =  await Details.findOne({_id:decodedToken._id});
                //     console.log(name.name);
                // }
                // userName();
                const user = await adminData.findById(decodedToken._id)
                req.user = user;
                
                next();
            }
        })
    }
    else{
        // console.log(err)
        // res.redirect('/admin/login'); 
        req.user = null; 
        next();
    }
}


const userName = (req,res,next) =>{
    const token = req.cookies.jwtoken;
    // console.log(token);
    if(token){
        jwt.verify(token , process.env.SECRETKEY ,async  (err , decodedToken) => {
            if (err){
                // console.log(err)
                res.redirect('/admin/login'); 
            }
            else{

                const name =  await adminData.findOne({_id:decodedToken._id});
                // console.log(name.name);

                next();   
            }
        })
    }
    else{
        // console.log(err)
        res.redirect('/admin/login');
    }

}



export default currentUser;
