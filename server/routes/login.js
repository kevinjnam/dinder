const express = require("express");
const login = express.Router();
const usercontroller = require("../controllers/UserController");
login.post("/", usercontroller.verifyUser, (req, res) => {
	res.send("verified");
});
login.post("/signup", usercontroller.createUser, (req, res) => {
	res.send("user Created");
});
