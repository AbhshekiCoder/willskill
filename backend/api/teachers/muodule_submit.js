let express  = require('express');

let module_submit = express.Router();

module_submit.post('/module_submit', (req, res)=>{
    let {id, name} = req.body;
    const client = new MongoClient(url);
    const db = client.db("School_Management");
    const collection = db.collection("modules");
    let obj = {
      topic_id: id,
      name: name
    }
    collection.insertOne(obj).then(result =>{
      
      if(result){
        collection.find({name: name}).toArray().then(result =>{
          if(result){
            res.send({"success": "updated", "data": result });
          }
  
        })
      }
    })
  
  })

  module.exports = module_submit;