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

router.post('/register_apps', async(req, res) =>{
    const{name, email, token} = req.body;
   
    try{
      
        let obj = {
            name: name,
            email: email,
            
        };
        let client = new MongoClient(url);
        let db = client.db("Tech_Temple");
        let collection = db.collection("users");
        collection.find({email: email}).toArray().then(result =>{
            if(result.length > 0){
                const token = jwt.sign({ email: email }, '123456', { expiresIn: '1h' });
           
                res.send({success: true, message: "login successfully", token: token});

            }
            else{
                collection.insertOne(obj).then(()=>{
                    const token = jwt.sign({ email: email }, '123456', { expiresIn: '1h' });
           
                     res.send({success: true, message: "login successfully", token: token});
                })

            }
        })
      
    }
    catch(err){
        console.log(err.message);
    }


})

 export default router