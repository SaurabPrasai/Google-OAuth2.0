const passport=require('passport');
const User = require('../models/userModel');
const bcrypt=require("bcrypt")


//login page
const getLogin=(req,res)=>{
    res.render("login")
}

//signup page
const getSignup=(req,res)=>{
    res.render('signup')
}

const postLogin=async(req,res)=>{
const {email,password}=req.body;
try {
    let user=await User.findOne({email});
    if(!user){
      return  res.redirect("/auth/signup")
    } 
    const isPasswordMatch=await bcrypt.compare(password,user.password)

    if(isPasswordMatch){
        req.login(user,(err)=>{
            if(!err){
             return  res.redirect("/profile")
            }
        })
    }else{
         return res.json({msg:"You entered the wrong password!"})
    }
} catch (error) {
    console.log(error);
}
}

const postSignup=async(req,res)=>{
const {username,email,password}=req.body;
try {
let user=await User.findOne({email});
if(user){
    return res.json({msg:"Email is already registered!"})
}
const salt=await bcrypt.genSalt();
const hashPassword=await bcrypt.hash(password,salt)
user=await User.create({username,email,password:hashPassword});
  // Log in the user after registration
  req.login(user, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.redirect("/profile")
  });
} catch (error) {
    console.log(error);
}
}


const logout=(req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw err;
        res.redirect('/auth/login')
       })
    }


module.exports={
    getLogin,logout,postLogin,postSignup,getSignup
}