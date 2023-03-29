const { productController } = require('../../controller/product/product.controller');
const multer = require('multer');
const storage = multer({ dest: './storage' });

module.exports = function (router) {
  router.post('/api/create', storage.single('file'), (req, res) => {
    console.log(req.body);
    productController.createProduct(req, res);
  })

  router.post('api/storage', storage.single('product-img'), (req, res) => {});

  router.get('/api/posts', (req, res) => {
    console.log(req.body);
    productController.getAllPosts(req,res)
      .then((response) => {
        res.send(response)
      })
      .catch((err) => {
        console.log(err)
        res.send({
          message: 'internal server error',
          status: 501,
        });
      });
  });

  router.get('/api/post/:id', (req, res) => {
    productController
      .getPost(req, res)
      .then((data) => {
        res.send(data);
      })
      .catch((e) => console.log(e))
  })

  router.delete('/api/delete/:id', (req, res) => {
    productController.deleteProduct(req,res).then(response =>{
      res.send(response);
      //console.log(response);
    });
  });

  router.get('/api/product', (req, res) => {
    productController.getPost(req, res)

    res.send('done');
  })

  router.post('/', (req, res) => {
    console.log(req.body);
  })
}
