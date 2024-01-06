require('dotenv').config();
const express=require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const profileRouter=require('./routes/profileRoutes')
const app=express();
require('./config/passport')
const session=require('express-session')
const passport = require('passport');
const mongoSession=require("connect-mongodb-session")(session);
const mongoURI='mongodb://localhost:27017/passport'


//database connection
mongoose.connect(mongoURI)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log(err);
})


const store=new mongoSession({
    uri:mongoURI,
    collection:'mySession'
})



//middleware

app.use(express.urlencoded({extended:false}))

app.use(session({
    secret:"The Secret key",
    resave:false,
    saveUninitialized:false,
    store:store,
    cookie:{
        maxAge:1000*60
    }
}))

app.use(passport.initialize());
app.use(passport.session())

app.use(authRouter)
app.use(profileRouter)



//view engine
app.set('view engine','ejs');



app.get('/',(req,res)=>{
    res.render('home');
})


app.listen(3000,()=>{
    console.log("Listening on port 3000");
})