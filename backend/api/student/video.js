
import express  from 'express'
import   bodyParser from 'body-parser';
const app = express();
import dotenv from 'dotenv';

dotenv.config()
const url = process.env.URL
 import  { MongoClient} from 'mongodb';
import { ObjectId } from 'mongodb';
let video = express.Router()



video.post('/video', (req, res)=>{
    let {id} = req.body;
    console.log(id)
    let objectid = new ObjectId(id);
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("videos");
  
    collection.find({_id: objectid}).toArray().then(result=>{
      res.send(result);
     
    })
  
  
  })

  export default video;