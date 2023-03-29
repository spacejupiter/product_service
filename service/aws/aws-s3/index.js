const S3 = require('aws-sdk').S3
const config = require('../../../config/config')
const fs = require('fs')
const uid = require('uuid').v4

const s3 = new S3({
  accessKeyId: config.aws_access_key,
  secretAccessKey: config.aws_secrete_access_key,
})

module.exports.awsS3Service = {
  uploadFile: (file) => {
    const key = uid() + '.jpg'

    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(file.path);

      const uploadParams = {
        Bucket: config.aws_bucket_name,
        Body: fileStream,
        Key: key,
      }

      try {
        s3.upload(uploadParams).promise().then(res=>{
          resolve(res);
        })
       
        //save key to db
      } catch (error) {
        reject(error)
      }
    })
  },

  getImage: (id) => {
    return new Promise((resolve, reject) => {
      const downloadParams = {
        Bucket: config.aws_bucket_name,
        Key: id,
      }

      try {
        resolve(s3.getObject(downloadParams).promise())
      } catch (error) {
        reject(error)
      }
    })
  },

  listAllObjects: (req) => {
    return new Promise((resolve, reject) => {
      const listParams = {
        Bucket: config.aws_bucket_name,
      }

      try {
        resolve(s3.listObjects(listParams).promise())
      } catch (error) {
        reject(error)
      }
    })
  },

  deleteFile: (_id) => {
    return new Promise((resolve, reject) => {
      const deleteParams = {
        Bucket: config.aws_bucket,
        Key:_id
      }

      try {
        resolve(s3.deleteObjects(deleteParams).promise())
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  },
}
