const checkAuth = require('../middlewares/checkAuth');

const router=require('express').Router();


router.get('/profile',checkAuth,(req,res)=>{
    res.render("profile",{user:req.user})
})

module.exports=router;