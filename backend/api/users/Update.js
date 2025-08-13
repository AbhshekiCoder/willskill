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
const router = express.Router();

router.put('/user_profile_update', (req, res)=>{
    const {email, name, old_email} = req.body;

    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("users");
    collection.updateOne(
        {email: old_email},
        {$set:{name: name, email: email}}



    ).then(()=>{
        res.send("updated successfully")

    })
   
})

export default router;