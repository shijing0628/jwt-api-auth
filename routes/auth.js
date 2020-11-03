const router = require('express').Router();
const User = require('../model/User');
//validation
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs');
const { restart } = require('nodemon');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
 //validate data before we create a new user
 const { error } = registerValidation(req.body);
 if (error) return res.status(400).send(error.details[0].message);

 // checking if user is in DB
 const emailExist = await User.findOne({
  email: req.body.email
 });
 if (emailExist) return res.status(400).send('Email already exists.')

 // hash password
 const salt = await bcrypt.genSaltSync(10);
 const hashedPassword = await bcrypt.hash(req.body.password, salt);

 const user = new User({
  name: req.body.name,
  email: req.body.email,
  password: hashedPassword
 })
 try {
  const savedUser = await user.save();
  res.send({
   user: user._id
  });
 } catch (err) {
  res.status(400).send(err);
 }
})

router.post('/login', async (req, res) => {
 //validate data before we create a new user
 const { error } = loginValidation(req.body);
 if (error) return res.status(400).send(error.details[0].message);
 // checking if email exist
 const user = await User.findOne({
  email: req.body.email
 });
 if (!user) return res.status(400).send('Email or password is not correct.');

 const validPass = await bcrypt.compare(req.body.password, user.password);
 if (!validPass) return res.status(400).send('Invalid password');

 //create and assign a token
 const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
 res.header('auth-token', token).send(token);

 //res.send('log in!')
})

module.exports = router; 