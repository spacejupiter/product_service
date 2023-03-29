const productservice = require('../../service/product/product.service')
  .productservice
const Validate = require('../../validators/productitem.validator')
const { awsS3Service } = require('../../service/aws/aws-s3')
const fs = require('fs')

module.exports.productController = {
  createProduct: (req, res) => {
    return new Promise((resolve, reject) => {
      const { file } = req;
      if (!file) {
        console.log(file);
        res.send('no image attached');
        return
      } else {
        awsS3Service.uploadFile(file).then((response) => {
          const { Key, Location } = response

          var payload = {
            name:req.body.name,
            userId: req.body.userId,
            imageId: Key,
            url: Location,
            price: req.body.price,
            condition: req.body.condition,
            lengthOfUsage: req.body.lengthOfUsage,
            createdAt: new Date(),
            currency: req.body.currency,
            category: req.body.category,
          }
          Validate(payload)
            .then((validatedData) => {
              //res.send(validatedData);
              if(validatedData){
                productservice.createProduct(validatedData).then(message=>{
                  res.send(message);
                });
              }
            
            })
            .catch((e) => {
              console.log(e)
              res.send(e);
            })
        })
      }
    })
  },

  getAllPosts: (req, res) => {
    return new Promise((resolve, reject) => {
      productservice
        .getAllPosts()
        .then((docs) => {
          res.send(docs)
          console.log(docs)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  },

  getPost: (req, res) => {
    return new Promise((resolve, reject) => {
      const { id } = req.params
      console.log(id)
      awsS3Service.getImage(id).then((data) => {
        resolve(data)
        console.log(data)
      })
    })
  },

  deleteProduct: (req, res) => {
    return new Promise((resolve, reject) => {
      const { id } = req.params
      awsS3Service.deleteFile(id).then(resolve(res))
    })
  },
}
