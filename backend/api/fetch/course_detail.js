import express from 'express'
import  bodyParser from 'body-parser';
const app = express();
import dotenv from 'dotenv';

dotenv.config()
const url = process.env.URL
 import  { MongoClient, ObjectId} from 'mongodb';
import jwt from 'jsonwebtoken';



app.use(bodyParser.json());
app.use(express.json());
const course_detail = express.Router();




course_detail.get('/course_detail/:id', (req, res) =>{
    let {id} = req.params;
    let objectid = new ObjectId(id)
    console.log(id)
    

   
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("courses");
    try{
        collection.findOne({_id: objectid}).then(result =>{
            res.send(result);
            console.log(result)
        })
    }
    catch(err){
        console.log(err);
    }
});

export default course_detail;