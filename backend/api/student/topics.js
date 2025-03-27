import express  from 'express'
import   bodyParser from 'body-parser';
const app = express();
import dotenv from 'dotenv';

dotenv.config()
const url = process.env.URL
 import  { MongoClient} from 'mongodb';

let topics = express.Router();

topics.post('/topics', (req, res)=>{
    let {name} = req.body;
    console.log(name)
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("videos");
  
    collection.find({topic_id: name}).toArray().then(result=>{
      res.send(result);
     
  
    })
  
  
  })

  export default topics;