
const { register, login } = require('../../controller/user/auth.controller');

module.exports = function User(router) {
  router.post('/register', (req, res) => {
    register(req, res)
  })

  router.post('/login', (req, res) => {
    login(req, res);
  })
}
