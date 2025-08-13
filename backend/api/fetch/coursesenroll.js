 import express  from 'express'
import   bodyParser from 'body-parser';
const app = express();
import dotenv from 'dotenv';

dotenv.config()
const url = process.env.URL
 import  { MongoClient} from 'mongodb';
 import jwt from 'jsonwebtoken';



app.use(bodyParser.json());
app.use(express.json());
const enroll_courses  = express.Router();




enroll_courses.post('/enroll_courses/:id', (req, res) =>{
    let {id} = req.params;
    
    let email =  jwt.decode(id)
  console.log(email)
   
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("cart");
    try{
        collection.find({user: email.email}).toArray().then(result =>{
            res.send(result);
            console.log(result)
        })
    }
    catch(err){
        console.log(err);
    }
});
export default enroll_courses;