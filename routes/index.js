const express= require('express');
const router=  express.Router();
const {ensureAuth,ensureGuest} = require('../middleware/auth');

const Story = require('../Model/Story');


//@desc Login/Landing Page
// @route GEt/
router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{
        layout:'login',
    });
})

//@desc  dashboard
// @route GEt/ dashboard
router.get('/dashboard',ensureAuth,async(req,res)=>{
    try{
        const stories = await Story.find({ user: req.user.id }).lean()
        console.log(req.user);
         console.log(req.session);
        res.render('dashboard',{
        name : req.user.firstName,stories
        });
    }
    catch(err){
        console.log(err);
        res.render('error/500')
    }
    
})






module.exports=router;