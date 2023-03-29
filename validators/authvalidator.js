const Joi = require('joi');

function validate(req, res) {
  return new Promise((resolve, reject) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8)
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      repeat_password: Joi.ref('password'),
      username: Joi.string().alphanum().min(3).max(30).required(),
    });

    try {
      const {value,error} = schema.validate({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        repeat_password: req.body.repeat_password,
      });
      

      if(!error){
       resolve(value);

      }
      else{
        throw error;
      }
    } catch (error) {
      var {message} = error;
      console.log(error);
      res.status(error).send(message);
      reject(message);
    }
  })
}

module.exports = validate;
