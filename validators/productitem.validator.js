const Joi = require('joi');


function validate(payload) {
  return new Promise((resolve, reject) => {
    const schema = Joi.object({
      name:Joi.string().required(),
      url: Joi.string().required(),
      userId: Joi.string().required(),
      imageId:Joi.string().required(),
      price:Joi.string().required(),
      condition:Joi.string().required(),
      lengthOfUsage:Joi.string().required(),
      currency:Joi.string().required(),
      category:Joi.string().required(),
      createdAt:Joi.date()
    });

    try {
      const {value,error} = schema.validate({
        name:payload.name,
        url: payload.url,
        userId: payload.userId,
        imageId: payload.imageId,
        price: payload.price,
        condition:payload.condition,
        lengthOfUsage:payload.lengthOfUsage,
        currency:payload.currency,
        category:payload.category,
        createdAt:payload.createdAt
      });
      

      if(!error){
       resolve(value);

      }
      else{
        throw error;
      }
    } catch (error) {
      var {message} = error;
      reject(message);
    }
  })
}

module.exports = validate;
