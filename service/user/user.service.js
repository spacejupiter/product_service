const database = require('../../database/db/helpers')
const userModel = require('../../database/db/models/user/user.model')
var db = new database()

module.exports.userService = {
  createUser: (payload) => {
    return new Promise((resolve, reject) => {
      var message = {}
      try {
        db.findOne(userModel, { email: payload.email }).then((user) => {
          if (!user) {
            console.log('user saved')
            db.insertOne(userModel, payload)
            message.status = 'OK'
            resolve(message)
          } else {
            message.status = 'failed'
            reject(message)
          }
        })
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  },

  getUser: (email) => {
    return new Promise((resolve, reject) => {
      try {
        const user = db.findOne(userModel, { email })

        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
  },

  getAllusers: () => {
    return new Promise((resolve, reject) => {
      resolve(db.findAll(userModel))
    })
  },

  deleteUser: (_id) => {},
}
