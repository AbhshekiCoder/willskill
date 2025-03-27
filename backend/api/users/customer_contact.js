import express  from 'express'
import   bodyParser from 'body-parser';
const app = express();
import dotenv from 'dotenv';

dotenv.config()
const url = process.env.URL
 import  { MongoClient} from 'mongodb';
 import jwt from 'jsonwebtoken';




import customer_contact from '../../model/usermodal/contact.js';
app.use(bodyParser.json());
app.use(express.json());
const router = express.Router();
router.post('/customer_contact', async(req, res) =>{
    const {email, name, description} = req.body;
   
   
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("contact");
    let obj = new customer_contact({
        name: name,
        email: email,
        description: description
    })
    try{
        collection.insertOne(obj).then(()=>{
            res.send({"success": true, "message": "successfully updated your query we resolve you query in quickly"})
        })
    }
    catch(err){
        res.send({"success": false, "message": err.message});
        console.log(err.message);
        
    }
})

export default router