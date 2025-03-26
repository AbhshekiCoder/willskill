const express = require('express');


const razorpay = require('razorpay')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {MongoClient} = require('mongodb')

dotenv.config()
let url = process.env.URL

let enroll = express.Router();
 

enroll.post('/enroll', async(req, res) =>{
    let {user, course_id} = req.body;
    console.log(user)
    let email = jwt.decode(user);

    let client = new MongoClient(url);
    let db = client.db("Tech_Temple");
    let collection = db.collection("cart");
    let result = await collection.findOne({$and:[{course_id: course_id }, {user: email.email}]});
    if(result){
      
        res.send({success: true})
    }
    else{
       
        res.send({success: false})
    }

})

module.exports = enroll;