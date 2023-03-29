const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
  sign: (_id, exp) => {
    return new Promise((resolve, reject) => {
     const token = jwt.sign(
          { data: _id,},
          config.jwtSecret,
          { expiresIn: exp },
        );
        resolve(token);
    })
  },
  authorize: (req, res, next) => {
    return new Promise((resolve, reject) => {
      const token =
        req.headers['authorization'] &&
        req.headers['authorization'].split('')[1];
      jwt
        .verify(token, secret)
        .then((res) => {
            next();
        })
        .catch((e) => {
          reject(e);
          res.status(401).send('unauthorized');
        })
    })
  },
}
