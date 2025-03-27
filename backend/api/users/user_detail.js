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
router.post('/user_detail', async(req, res) =>{
    const {token} = req.body;
    const user = jwt.decode(token);
  
   
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("users");
    collection.findOne({email: user.email}).then(result =>{
        res.send(result);

    })
   
})

 export default router