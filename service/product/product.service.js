const database = require('../../database/db/helpers')
const productModel = require('../../database/db/models/product/product.model')
const productImage = require('../../database/db/models/product/product.image.model')
var db = new database()

module.exports.productservice = {
  createProduct: (payload) => {
    return new Promise((resolve, reject) => {
      db.insertOne(productModel, payload)
      .then(message=>{
        resolve(message);
      })
      .catch(e =>{
        reject(e);
      });
    });
  },

  getPosts: (_id) => {},

  getAllPosts: () => {
    return new Promise((resolve, reject) => {
      resolve(db.findAll(productModel))
    })
  },

  deleteProduct: (_id) => {},
}
