const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/UserController");

router.post("/", usercontroller.verifyUser, (req, res) => {
	res.send("verified");
});
router.post("/create", usercontroller.createUser, (req, res) => {
	console.log('inside router post signup')
	res.send("user Created");
});
module.exports = router;
