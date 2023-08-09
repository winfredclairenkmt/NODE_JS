const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("connect-ensure-login");


router.get("/dashboard", ensureLoggedIn("/api/login"), (req, res) => {
    res.render("./pug/login.pug");
});



module.exports = router;