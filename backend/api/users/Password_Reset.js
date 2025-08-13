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

router.post('/user_password_reset', (req, res)=>{
    const {email,  new_password} = req.body;
    let client = new MongoClient(url);
    let db = client.db("Tech_Temple");
    let collection = db.collection("users");
    try{
        collection.updateOne(
            {email: email},
            {
                $set:{password: new_password}
            }
        ).then(()=>{
            res.send("password reset successfully")
        })
    }catch(err){
        console.log(err.message);
    }

})

 export default router
