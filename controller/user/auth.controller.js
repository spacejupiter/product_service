const bcrypt = require('bcrypt')
const { userService } = require('../../service/user/user.service')
const validateUserForm = require('../../validators/authvalidator')
const { sign, authenticate } = require('../../middlewares/jwt')

module.exports = {
  register: (req, res) => {
    return new Promise((resolve, reject) => {
      validateUserForm(req, res)
        .then((value) => {
          if (value) {
            try {
              bcrypt.genSalt().then((salt) => {
                bcrypt
                  .hash(req.body.password, salt)
                  .then((encryptedPassword) => {
                    var data = {
                      email: req.body.email,
                      password: encryptedPassword,
                      username: req.body.username,
                    }
                    userService
                      .createUser(data)
                      .then((message) => {
                        console.log(message);
                        if (message.status === 'OK') {
                          res.status(200).send('user saved')
                        }
                        
                      })
                      .catch((e) => {
                        console.log(e)

                        res.status(204).send('this email already exists');
                      })
                  })
              })
            } catch (error) {
              console.log(error)
            }
          }
        })
        .catch((error) => {
         // console.log(error);
        })
    }).catch((e) => {
      //console.log(e)
      reject(e)
    })
  },

  login: (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    const errors = []
    userService
      .getUser(email)
      .then((user) => {
        console.log(user);
        if (user) {
          bcrypt.compare(password, user.password).then((result) => {
            console.log(user)
            if (result === true) {
              sign(email, '60s').then((token) => {
                res.status(200).send(JSON.stringify({
                  id:user._id
                  ,token
                }))
              
              })
            } else {
              errors.push('incorrect credentials');
            }
          })
        } else {
          errors.push('users does not exist');
        }
        if (errors.length > 0) {
          res.status(404).send(errors)
        }
      })
      .catch((e) => {})
  },
}
