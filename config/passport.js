const passport=require('passport');
const User = require('../models/userModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/redirect"
  },
  async function(accessToken, refreshToken, profile, cb) {
   const user=await User.findOne({googleId:profile.id});
   if(!user){
    const newUser=await User.create({
        username:profile.displayName,
        email:profile.emails[0].value,
        googleId:profile.id
    })
    if(newUser){
        cb(null,newUser)
    }
   }else{
    cb(null,user)
   }
  }
));

passport.serializeUser((user,cb)=>{
   cb(null,user.id)
})

passport.deserializeUser(async(id,cb)=>{
    const user=await User.findById(id);
    cb(null,user)
})