import express  from 'express'
import   bodyParser from 'body-parser';
const app = express();
import dotenv from 'dotenv';

dotenv.config()
const url = process.env.URL
 import  { MongoClient} from 'mongodb';
 import jwt from 'jsonwebtoken';


import bcrypt  from 'bcrypt';

app.use(bodyParser.json());
app.use(express.json());
const router = express.Router();
router.post('/login', async(req, res) =>{
    const {email, password} = req.body;
   
   
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("users");
    try{
      
        let result =  await collection.findOne({email: email});
           
            if(!result){
                res.send({success:false, message: "invalid email"})
                return;
 
             }
              try{
                let result1 = await bcrypt.compare(password, result.password);
                if(result1){
                    
                    const token = jwt.sign({ email: email }, '123456', { expiresIn: '1h' });
                    res.status(201).send({success: true, message: "login successfully", token: token, user: result});
                }
                else{
                     res.send({success: false, message: "invalid password"})
             
               }
 

              }catch(err){
                res.send({success:false, message: "invalid email"})

              }
            
            

        
           
      
    }catch(err){
        
        console.log(err.message);
    }
})






 export default router;