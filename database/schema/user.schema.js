const schema = require('mongoose').Schema;

module.exports = new schema({
   username: String, 
   email : String,
   password : String
})