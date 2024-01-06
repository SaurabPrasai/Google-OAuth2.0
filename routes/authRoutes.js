const router=require("express").Router();
const passport=require('passport');
const { getLogin, logout, getSignup, postLogin, postSignup } = require("../controllers/authController");

//passport js
router.get('/auth/google',
passport.authenticate("google",{
    scope:['email','profile']
}))


router.get('/auth/google/redirect', 
passport.authenticate("google",{
    successRedirect:'/profile',
    failureRedirect:'/auth/login'
    }))

//form
router.get('/auth/login',getLogin)

router.get("/auth/signup",getSignup)

router.post("/auth/login",postLogin);

router.post("/auth/signup",postSignup)








router.get('/auth/logout',logout)




module.exports=router;