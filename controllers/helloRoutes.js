const express = require("express");
const router = express.Router();


//our hello route
router.get("/api/hello", (req, res) => {
    res.render("hello.pug")
});

//our landing page route
router.get("/landing", (req, res) => {
    res.render("landing.pug")
});


module.exports = router;