import express from 'express'
import bodyParser from 'body-parser' 
const app = express();
import dotenv from 'dotenv'

dotenv.config()
const url = process.env.URL
import { MongoClient } from 'mongodb';

import bcrypt from 'bcrypt'

app.use(bodyParser.json());
app.use(express.json());
const router = express.Router();


router.post('/adminsignup', async(req, res) =>{
    const{name, email, password, role, staff} = req.body;
    let password1 = 0;
    try{
        if(role == 'admin'){
            let password1 = await bcrypt.hash(password, 10);
        let obj = {
            name: name,
            email: email,
            password: password1,
            staff: staff
        };
      
        let client = new MongoClient(url);
        let db = client.db("Tech_Temple");
        let collection = db.collection("admin");
        
         collection.find({email: email}).toArray().then(result =>{
            if(result.length > 0){
               
                res.status(200).send({success: false, message: "email already registered"});
               
            }
            else{
               collection.insertOne(obj).then(()=>{
                res.status(201).send({success: true, message: "successfully registered"});

               }).catch(err =>{
                res.status(500).send({success: false, message: "error during registration"})
               })
               
               
               

            }
        })

        }
        else{
            let password1 = await bcrypt.hash(password, 10);
        let obj = {
            name: name,
            email: email,
            password: password1
        };
       
        let client = new MongoClient(url);
        let db = client.db("Tech_Temple");
        let collection = db.collection("teacher");
        
         collection.find({email: email}).toArray().then(result =>{
            if(result.length > 0){
               
                res.status(200).send({success: false, message: "email already registered"});
               
            }
            else{
               collection.insertOne(obj).then(()=>{
                res.status(201).send({success: true, message: "successfully registered"});

               }).catch(err =>{
                res.status(500).send({success: false, message: "error during registration"})
               })
               
               
               

            }
        })
        }
        
      
    }
    catch(err){
        res.status(500).send({success: false, message: "Error during registration"})
    }


})


export default router;