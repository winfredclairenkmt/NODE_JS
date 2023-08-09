const express = require("express");
const router = express.Router();
const Signup = require("../models/userModel");
const passport = require("passport");
const { ensureLoggedIn } = require("connect-ensure-login");

router.get("/signup", (req, res) => {
    res.render("./pug/user.pug");
});

router.post("/register", async (req, res) => {
    try{
        const user = new Signup(req.body);
        await Signup.register(user, req.body.password);
        console.log(req.body);
        res.redirect("/api/signup");
    }
    catch(error){
        res.status(400).send({message: "Sorry could not register user"});
        console.log(error);
    }
});

//get route for our login page
router.get("/login", ensureLoggedIn('/api/login.pug'),(req, res) => {
    res.render("./pug/login.pug");
});

router.post("/login", passport.authenticate("local",
{failureRedirect: "/api/login"}), 
(req, res)=> {
    req.session.user = req.user
  let  loggedInUser = req.session.user.firstname;
console.log("logged  in user: " );
  res.redirect("/api/dashboard", {loggedInUser});
}
)


module.exports = router;