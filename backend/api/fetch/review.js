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




router.post('/review', (req, res) =>{
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("review");
    try{
        collection.find().toArray().then(result =>{
            res.send(result);
        })
    }
    catch(err){
        console.log(err.message);
        
    }
    
})
export default router;