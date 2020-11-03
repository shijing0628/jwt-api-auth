const router = require('express').Router();
const User = require('../model/User');
const verify = require("./verifyToken");

router.get('/', verify, (req, res) => {
 //res.json({ posts: { title: 'my first post', description: "randam data" } })
 res.send(req.user);
 User.findByIdAndRemove({ _id: req.user });
})


module.exports = router;
