const express = require('express')
const  bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');

dotenv.config()
const url = process.env.URL
const { MongoClient} = require('mongodb');
const jwt = require('jsonwebtoken');



app.use(bodyParser.json());
app.use(express.json());
const enroll_courses  = express.Router();




enroll_courses.post('/enroll_courses/:id', (req, res) =>{
    let {id} = req.params;
    
    let email =  jwt.decode(id)
  console.log(email)
   
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("enroll_courses");
    try{
        collection.find({email: email.email}).toArray().then(result =>{
            res.send(result);
        })
    }
    catch(err){
        console.log(err);
    }
});

module.exports = enroll_courses ;