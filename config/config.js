
module.exports = {
    port:process.env.PORT,
    host:process.env.HOST,
    aws_bucket_name : process.env.AWS_BUCKET_NAME,
    aws_region : process.env.AWS_REGION,
    aws_access_key : process.env.AWS_ACESS_KEY,
    aws_secrete_access_key : process.env.AWS_SECRET_ACESS_KEY,

    database:{
        username_dev:process.env.DATABASE_DEV_USERNAME,
        username_prod : process.env.DATABASE_PROD_USERNAME ,
        password_prod : process.env.PASSWORD_PROD,
        password_dev : process.env.PASSWORD_DEV,
        getUri : ()=>{
          return process.env.MONGO_URI;
        }
    },
    jwtSecret :process.env.JWT_ACCESS_TOKEN
}