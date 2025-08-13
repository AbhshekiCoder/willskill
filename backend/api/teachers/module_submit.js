import express from 'express';

let module_submit = express.Router();
import  {MongoClient} from 'mongodb';
import dotenv from 'dotenv';




dotenv.config()
let url = process.env.URL
module_submit.post('/module_submit', (req, res)=>{
    let {id, name} = req.body;
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
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

 export default module_submit