import express from "express";
import userData from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import adminData from "../models/adminModel.js";

export const userController = async (req, res) => {

    if (req.user) {
        const users = await userData.find().sort({ createdAt: 'desc' });

        const nameArr = [];
        users.forEach(user => {
            nameArr.push(user.Name)
        })
        res.json({
            userList: nameArr
        })
    }
    else {
        res.status(400).json({ "error": "Please Login first." })
    }
}


// export const usercheck = async (req, res) => {

//     if (req.user) {
//         res.json({ user: req.user })
//     }
//     else {
//         res.status(400).json({ "error": "Please Login first." })
//     }
// }

// export const adminProfile = (req, res) => {
//     res.send('admin profile')
// }

export const userRegisterGet = (req, res) => {
    res.send(`<h1> userRegisterGet </h1>`)
}

// export const adminLoginGet = (req, res) => {
//     res.send(`<h1> adminLoginGet </h1>`)
// }

export const userRegisterPost = async (req, res) => {

    // console.log(req.body)

    try {
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;

        // console.log(password , confirm_password)
        if (password === confirm_password) {

            const newUser = new userData(req.body);

            // console.log(newUser)
            const registered = await newUser.save();

            // generating jwt at login
            const token = await registered.generateAuthToken();

            res.cookie("jwtoken", token, {
                httpOnly: true,
            })

            res.status(201).json({ registered: registered._id })
        }
        else {
            res.status(404).json({ 'error': 'Enter same confirm password' })
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// going to modify it for admin and login both
export const userLoginPost = async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        // console.log(email,password)
        const check_admin = await adminData.findOne({ email: email });
      
        if (check_admin) {
            const isMatch = await bcrypt.compare(password, check_admin.password);

            if (isMatch) {
                // generating jwt at login 
                const token = await check_admin.generateAuthToken();

                // storing cookies
                // var maxTime = 10 * 60 * 60 //  not worked because variable name for cookie must be maxAge
                // var maxAge = 10 * 60 *1000
                res.cookie("jwtoken", token, {
                    // expires: new Date(Date.now() + maxAge),
                    // expiresIn: maxTime*1000,
                    httpOnly: true
                })

                res.status(200).json({ msg : 'ADMIN' });

            }
            else {
                res.status(400).json({ "password": "Invalid password" });
            }
        }
        else {
            const userData_ = await userData.findOne({ email: email });

            if (userData_) {
                const isMatch = await bcrypt.compare(password, userData_.password);

                if (isMatch) {
                    // generating jwt at login 
                    const token = await userData_.generateAuthToken();

                    // storing cookies
                    // var maxTime = 10 * 60 * 60 //  not worked because variable name for cookie must be maxAge
                    // var maxAge = 10 * 60 *1000
                    res.cookie("jwtoken", token, {
                        // expires: new Date(Date.now() + maxAge),
                        // expiresIn: maxTime*1000,
                        httpOnly: true
                    })

                    res.status(200).json({ msg : 'USER' });

                }
                else {
                    res.status(400).json({ "password": "Invalid password" });
                }
            }
            else {
                res.status(400).json({ 'email': 'Invalid Email' })
            }
        }
    }
    catch (error) {
        res.status(400).json({ error : error.message })
    }
}



export const logout_get = async (req, res) => {
    console.log(req.user)
    try {
        const currUser = await userData.findOne({_id : req.user.id});
        // console.log(currUser)
        currUser.tokens = currUser.tokens.filter(currEle => {
            return currEle.token != req.token;
        })

        res.clearCookie('jwtoken', {
            expires: new Date(Date.now() + 1),
        });

        await currUser.save(() =>{
            res.status(200).json({msg : 'Logged Out'})
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

