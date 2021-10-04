import express from "express";


const router = express();

router.get('/' , (req,res) => {
    res.send('home')
})


router.get('/test' , (req,res) => {
    res.send('testing')
})

export default router;