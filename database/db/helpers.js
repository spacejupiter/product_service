const mongoose = require('mongoose');
const config = require('../../config/config');

class database{
  constructor(){
    this.urlParameter = {
      useNewUrlParser : true,
      useUnifiedTopology : true
    }

  }

  connect(){
    return new Promise((resolve,reject)=>{
      mongoose.connect(config.database.getUri(),this.urlParameter)
      .then((doc)=>{
        this.log('PRODUCT DATABASE CONNECTED');
        resolve();
      }).catch(err =>{
        console.log(err);
      })
    })
  }

  log(message){
    console.log(message);
  };

  findOne(model,id){
    return new Promise ((resolve,reject)=>{
      resolve(model.findOne(id));
    })
  };

  findAll(model){
    return new Promise((resolve, reject) => {
      try {
        resolve(model.find()); 
      } catch (error) {
        reject(error);
      }
    })
  }

  delete(id){

  };

  insertOne(model,item){
    var model = model;
    return new Promise((resolve,reject)=>{
      try{
        var Model = new model(item);
        Model.save().then(message=>{
          resolve(message);
        })
      }
      catch(err){
        reject(err);
      }
    }) 
  };

  update(id){
    //call the update service
  }

}







module.exports=database;