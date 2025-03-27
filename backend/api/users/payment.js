import express  from 'express'
import   bodyParser from 'body-parser';
const app = express();
import dotenv from 'dotenv';

import {ObjectId} from 'mongodb';

dotenv.config()

 import  { MongoClient} from 'mongodb';
 import jwt from 'jsonwebtoken';


import Razorpay  from 'razorpay'





let url = process.env.URL

let payment = express.Router();
 
const razorpayInstance = new Razorpay({
  key_id: "rzp_test_pEZdDpwnJejkWR",
  key_secret: "YVC6HQFJ8OJGeFq6MNzCzjEN",
});

payment.post('/payment', async(req, res) =>{
    let {name, price, course_id, user_id } = req.body;
    let email = jwt.decode(user_id);
    console.log(price)
    let objectId = new  ObjectId(course_id)
   
   
    try {
      const options = {
        amount: price * 100, // Amount in paise (500.00 INR)
        currency: "INR",
        receipt: "receipt#1",
      };
        
      const order = await razorpayInstance.orders.create(options);
    
      if(order){
        const client = new MongoClient(url);
          const db = client.db("Tech_Temple");
          const collection = db.collection("cart");
          const collection1 = db.collection("courses");
          collection1.findOne({_id: objectId}).then(result =>{
            console.log(result)
            if(result){
              let obj = {
                name: name,
                price: price,
                course_id: course_id,
                user: email.email,
                start_date: result.start_date,
                end_date: result.end_date
               }
               let result1 =  collection.insertOne(obj);
               console.log(result1)
               res.send({success: true, message: "successfully registered", amount: price});
     

            }
          })
   }
   else{
    res.send({success: false, message: "something went wrong"})
   }
    } catch (error) {
      console.error("Error creating order", error);
      res.status(500).send("Server Error");
    }
  });
  
   
    

 export default payment