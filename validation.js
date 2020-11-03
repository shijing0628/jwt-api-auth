const Joi = require('joi');
// register validation
const registerValidation = (data) => {
 const schema = Joi.object({
  name: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
  //repeat_password: Joi.ref('password').required(),
  email: Joi.string().min(6).required().email()
 });
 return schema.validate(data);
}


const loginValidation = (data) => {
 const schema = Joi.object({
  password: Joi.string().min(6).required(),
  //repeat_password: Joi.ref('password').required(),
  email: Joi.string().min(6).required().email()
 });
 return schema.validate(data);
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;