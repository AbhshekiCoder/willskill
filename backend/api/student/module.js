import express  from 'express'
import   bodyParser from 'body-parser';
const app = express();
import dotenv from 'dotenv';

dotenv.config()
const url = process.env.URL
 import  { MongoClient} from 'mongodb';

let module = express.Router();

module.post('/modules', (req, res)=>{
    console.log("hello")
    let {id} = req.body;
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("modules");
    collection.find({topic_id: id}).toArray().then(result =>{
      res.send(result);
      console.log(result)
    })
      
    })
export default module;