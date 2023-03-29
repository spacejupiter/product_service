const schema = require('mongoose').Schema;

module.exports = new schema({
  name:String,
  url:String,
  imageId : String,
  userId : String,
  postId : String,
  price : Number,
  createdAt : Date,
  updatedAt : Date,
  condition : String,
  lengthOfUsage : String,
  currency : String,
  category : String,
  
});
