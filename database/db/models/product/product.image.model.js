const { mongoose } = require("mongoose");
const imageSchema = require('../../../schema/product.image.schema');

module.exports = mongoose.model('Productimage',imageSchema);
