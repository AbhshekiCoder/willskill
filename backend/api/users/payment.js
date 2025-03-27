import express  from 'express'
import   bodyParser from 'body-parser';
const app = express();
import dotenv from 'dotenv';

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
          console.log(result)
          res.send({success: true, message: "successfully registered", amount: price});

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