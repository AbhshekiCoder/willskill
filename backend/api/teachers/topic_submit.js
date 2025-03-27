import express  from 'express'
import   bodyParser from 'body-parser';
const app = express();
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config()

 import  { MongoClient} from 'mongodb';
 import jwt from 'jsonwebtoken';

let topic_submit = express.Router();


import upload from '../../authentication/upload.js';
import path  from  'path';
import {fileURLToPath }  from 'url';




dotenv.config()
let url = process.env.URL

topic_submit.post('/topic_submit', upload.single('file'), (req, res)=>{
    let {title, topic_id, type, course_id} = req.body;
     let _filename = fileURLToPath(import.meta.url); 
     let __dirname = path.dirname(_filename)
     console.log(fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)))
  
    let obj = {
      name: title,
      topic_id: topic_id,
      type: type,
      file: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)),
      course_id: course_id
      
    }
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("videos");
    try{
      collection.insertOne(obj).then(result =>{
        if(result){
            console.log(result)
          res.send("updated");
         
        }
       
      });
    
  
    }catch(err){
      console.log(err.message)
    }
    
  
  
  })

  export default topic_submit