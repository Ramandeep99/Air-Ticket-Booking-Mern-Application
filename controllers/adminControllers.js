import express from "express";
import adminData from "../models/adminModel.js";
import bcrypt from 'bcryptjs'

export const userController = async (req, res) => {

    if (req.user) {
        const admins = await adminData.find().sort({ createdAt: 'desc' });

        const nameArr = [];
        admins.forEach(user => {
            nameArr.push(user.Name)
        })
        // console.log(nameArr)
        res.json({
            userList: nameArr
        })
    }
    else {
        res.status(400).json({ "error": "Please Login first." })
    }
}

export const usercheck = async (req, res) => {

    if (req.user) {
        res.json({ user: req.user })
    }
    else {
        res.status(400).json({ "error": "Please Login first." })
    }
}

export const adminProfile = (req, res) => {
    res.send('admin profile')
}

export const adminRegisterGet = (req, res) => {
    res.send(`<h1> adminRegisterGet </h1>`)
}

export const adminLoginGet = (req, res) => {
    res.send(`<h1> adminLoginGet </h1>`)
}

export const adminRegisterPost = async (req, res) => {

    console.log('request reached at admin register route')

    try {
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;

        // console.log(password , confirm_password)
        if (password === confirm_password) {

            const newAdmin = new adminData(req.body);

            // console.log(newAdmin)
            const registered = await newAdmin.save();

            // generating jwt at login
            const token = await registered.generateAuthToken();
            // console.log(token);

            // storing cookies
            // var maxAge = 10 * 60 * 1000
            res.cookie("jwtoken", token, {
                httpOnly: true,
                // expiresIn: maxTime*1000
                // expires : new Date(Date.now() + maxAge)
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

export const adminLoginPost = async (req, res) => {
    // console.log(req.user)
    try {
        const email = req.body.email;
        const password = req.body.password;

        // console.log(email,password)

        const userData = await adminData.findOne({ email: email });

        // console.log(userData)
        if (userData) {
            const isMatch = await bcrypt.compare(password, userData.password);

            if (isMatch) {
                // generating jwt at login 
                const token = await userData.generateAuthToken();

                // storing cookies
                // var maxTime = 10 * 60 * 60 //  not worked because variable name for cookie must be maxAge
                // var maxAge = 10 * 60 *1000
                res.cookie("jwtoken", token, {
                    // expires: new Date(Date.now() + maxAge),
                    // expiresIn: maxTime*1000,
                    httpOnly: true
                })
                
                res.status(200).json({ userData: userData._id });

            }
            else {
                res.status(400).json({ "password": "Invalid password" });
            }
        }
        else {
            res.status(400).json({ 'email': 'Invalid Email' })
        }
    }
    catch (error) {
        res.status(400).json({ error })
    }
}



export const logout_get = async (req, res) => {
    console.log(req.user.id)
    try {
        const currUser = await adminData.findOne({_id : req.user.id});
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

