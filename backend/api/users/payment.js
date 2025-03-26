const express = require('express');


const Razorpay =  require('razorpay')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {MongoClient} = require('mongodb')
const axios = require('axios');

dotenv.config()
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
          let obj = {
           name: name,
           price: price,
           course_id: course_id,
           user: email.email
          }
          let result =  collection.insertOne(obj);
          res.send(order);

   }
    } catch (error) {
      console.error("Error creating order", error);
      res.status(500).send("Server Error");
    }
  });
  
   
    

module.exports = payment;