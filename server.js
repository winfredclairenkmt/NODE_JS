const express = require("express");
const path = require("path");
require("dotenv").config();
const passport = require("passport");


//importing our database
const connectDB = require("./config/dbConfig");
const port =process.env.PORT ||3000;
const app = express();

const Signup= require("./models/userModel");
//importing my Routes 
const helloRoutes= require("./controllers/helloRoutes");
const employeeRoutes = require("./controllers/employeeRoutes");
const userRoutes = require("./controllers/userRoutes");
const dashboardRoutes = require("./controllers/dashboardRoutes");

//from line 16-21, we have imported express-session and usedit directly to pass parameters
const expressSession = require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
})

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

passport.use(Signup.createStrategy());
passport.serializeUser(Signup.serializeUser());
passport.deserializeUser(Signup.deserializeUser());




//calling the configuration to run
connectDB();
 
//setting up pug as our view engine
app.engine("pug",require("pug").__express);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views" ));

//seting up directories for static files
app.use(express.static(path.join(__dirname, "public")))


//using imported routes
app.use("/api" , helloRoutes);
app.use("/api" , employeeRoutes);
app.use("/api" , userRoutes);
app.use("/api" , dashboardRoutes);


//running the server aon a specific porrt in this case port number 3000
//it should always be the last piece of code in the server folder
 app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
 //this is called a CALLBACK
