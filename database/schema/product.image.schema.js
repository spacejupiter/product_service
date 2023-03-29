const schema = require('mongoose').Schema;

module.exports = new schema({
  fileId : String,
  userId : String,
  key : String
});
