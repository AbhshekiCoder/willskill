import express  from 'express'
import   bodyParser from 'body-parser';
const app = express();
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'

dotenv.config()
const url = process.env.URL
 import  { MongoClient} from 'mongodb';
 import jwt from 'jsonwebtoken';

app.use(bodyParser.json());
app.use(express.json());
const router = express.Router();
router.post('/signin', async(req, res) =>{
    const {email, password, role} = req.body;
   
   console.log(role)
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection(role);
    try{
      if(role == "admin" || "teacher"){
        
        let result =  await collection.findOne({email: email});
          
         if(!result){
             res.send({success:false, message: "invalid email"})
             return;

          }
          else{
          
          
           try{
            let password1 = await bcrypt.compare(password, result.password);
            if(password1){
              const token = jwt.sign({ email: email }, '123456', { expiresIn: '1h' });
              res.send({success: true, message: "login successfully", token: token, role: role});
          
          


            }
            else{
              res.send({success:false, message: "invalid password"})

            }
               
            
           
              
              

           }catch(err){
             console.log(err.message);

           }
         }
         

      }
      else{
        let result =  await collection.findOne({$and:[{email: email}, {password: password}]});
           console.log(result)
            if(!result){
                res.send({success:false, message: "invalid email or password"})
                return;
 
             }
             else{

             
              try{
               
              
                    console.log(role)
                    const token = jwt.sign({ email: email }, '123456', { expiresIn: '1h' });
                    console.log(result)
                    res.send({success: true, message: "login successfully", token: token, role: role, user: result });
                
                
 

              }catch(err){
                console.log(err.message);

              }
            }

      }
        
            
            

        
           
      
    }catch(err){
        
        console.log(err.message);
    }
})


 export default router;