const express= require('express');
const router=  express.Router();
const {ensureAuth,ensureGuest} = require('../middleware/auth');

const Story = require('../Model/Story');


//@desc Show add page
// @route GEt/stories.add
router.get('/add',ensureAuth,(req,res)=>{
    res.render('stories/add');
})


//@desc proceess add form
// @route GEt/stories
router.post('/',ensureAuth,async(req,res)=>{
    try{
        req.body.user=req.user.id;
        // req.body.title=req.body.tile;
        console.log(req.body);
        await Story.create(req.body)
        res.redirect('/dashboard')
    }
    catch(err){ 
        console.log(err);
        res.render('error/500')}
})

//@desc Show stories page all
// @route GEt/stories.add
router.get('/',ensureAuth,async(req,res)=>{
    try{
        const stories = await Story.find({status:'public'}).populate('user').sort({createdAt:'desc'}).lean();

        res.render('stories/index',{stories});
    }
    catch(err){ 
        console.log(err);
        res.render('error/500')
    }
})


//@desc Show single story
// @route GEt/stories.add
router.get('/:id',ensureAuth,async(req,res)=>{
    try {
        let story = await Story.findById(req.params.id).populate('user').lean()

        if(!story){
            return res.render('error/404')
        }
        res.render('stories/show',{story});
        
    } catch (error) {
        console.log(err);
        res.render('error/404')
    }
    
})

//@desc Show stories edit
// @route GEt/stories/edit/id
router.get('/edit/:id',ensureAuth,async(req,res)=>{
    try {
        const story = await Story.findOne(
            {_id:req.params.id
            }).lean();
        if(!story){
            res.render('error/404')
        }


        if(story.user != req.user.id){
            res.render('stories/')    
        }else{
            res.render('stories/edit',{
                story,
            });
        }
        
    } catch (error) {
        console.log(err);
        res.render('error/500')
    }

        
        
})


//@desc update story
// @route put/stories/:id
router.put('/:id',ensureAuth,async(req,res)=>{

    try {
        const story = await Story.findById(req.params.id).lean();
        if(!story){
            res.render('error/404')
        }

        
        if(story.user != req.user.id){
            res.render('stories/')    
        }else{
            story = await Story.findOneAndUpdate({_id: req.params.id},req.body, {
                new: true,
                runValidators:true
            })
            res.redirect('/dashboard');
        }
    } catch (error) {
        console.log(err);
        res.render('error/500')
    }
    
    
})



//@desc delete
// @route GEt/delte 
router.delete('/:id',ensureAuth,async(req,res)=>{
    
    try {
        await Story.remove({_id: req.params.id});
        res.redirect('/dashboard');
    } catch (error) {
        console.log(err);
        res.render('error/500')
    }
})


//@desc USer stories
// @route GEt/stories/user/:userId
router.get('/user/:userId',ensureAuth,async(req,res)=>{
    try {
        const stories = await Story.find({
            user:req.params.userId,
            status: 'public'
        }).populate('user').lean()
        res.render('stories/index',{stories})
    } catch (error) {
        console.log(err);
        res.render('error/500')
    }
})



module.exports=router;