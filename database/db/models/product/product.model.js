const { mongoose } = require("mongoose");
const productSchema = require('../../../schema/product.schema');

module.exports = mongoose.model('Post',productSchema);


