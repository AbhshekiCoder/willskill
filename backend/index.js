import express  from 'express';
import bodyParser  from 'body-parser';
import {MongoClient}  from 'mongodb';
import mongoose  from 'mongoose';
import cors  from 'cors';

const app =   express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())


import register  from './api/users/Register.js';
import login from   './api/users/Login.js';
import  user_profile_update  from './api/users/Update.js';
import  user_password_reset  from './api/users/Password_Reset.js';
import  register_apps  from './api/users/register_apps.js';
import  user_detail  from './api/users/user_detail.js';
import  jwt  from 'jsonwebtoken';
import  courses  from './api/teachers/courses.js';
import  user_review  from './api/student/user_review.js';
import  review  from './api/fetch/review.js';

import  signin  from './api/users/signin.js';
import  dotenv  from 'dotenv';
import  enroll_courses  from './api/fetch/coursesenroll.js'
import  quiz  from './api/fetch/quiz.js'
import  adminsignup  from './api/admin/adminsignup.js'
import  module_submit  from './api/teachers/module_submit.js';
import  course_detail  from './api/fetch/course_detail.js';
import  { appendFile }  from 'fs';
import  payment  from './api/users/payment.js';
import  enroll  from './api/users/enroll.js';
import   authenticateToken   from './authentication/authentication.js';
import  searchCourses  from './api/fetch/search_courses.js';
import    topic_submit   from './api/teachers/topic_submit.js';
import mongodbConnect from './config/ConnectDB.js'
import module from './api/student/module.js';
import topics from './api/student/topics.js';
import video from './api/student/video.js';
import customer_contact from './model/usermodal/contact.js';




let url =  process.env.URL;

mongodbConnect()

app.use('/register', register);
app.use('/login', login);
app.use('/user_profile_update', user_profile_update);
app.use('/user_password_reset', user_password_reset);
app.use('/register_apps', register_apps);
app.use('/user_detail', user_detail);
app.use('/courses', courses);
app.use('/user_review', user_review)
app.use('/review', review)

app.use('/signin', signin)
app.use('/enroll_courses/:id', enroll_courses)
app.use('/quiz', quiz)
app.use('/adminsignup', adminsignup);
app.use('/module_submit', module_submit )
app.use('/course_detail/:id', course_detail)
app.use('/payment', authenticateToken, payment)
app.use('/enroll', authenticateToken, enroll)
app.use('/searchcourses/:title', searchCourses)
app.use('/topic_submit', topic_submit)
app.use('/modules', module)
app.use('/topics', topics)
app.use('/video', video)
app.post('/course_detail', (req, res)=>{
    const  client = new MongoClient(url);
    const  db = client.db("Tech_Temple");
    const collection = db.collection("courses");
    collection.find().toArray().then(result =>{
        res.send(result);
      
    }
    )

})
app.use('/token', (req, res)=>{
    let {token} = req.body;
    if (!token) return res.status(403).send('Token is required');
    jwt.verify(token, '123456', (err, decoded) => {
      if (err) return res.status(401).send('Invalid token');
      req.email = decoded.email;
      res.send(decoded.email);
      
      
    });
  });
  app.post('/customer_contact', async(req, res) =>{
    const {email, name, description} = req.body;
    
   
   
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("contact");
    let obj = new customer_contact({
        name: name,
        email: email,
        description: description
    })
    try{
      let result = await  collection.insertOne(obj);
     
      if(result){
        res.send({success: true, message: "successfully updated your query we resolve you query in quickly"})

      }

            
        
    }
    catch(err){
        res.send({"success": false, "message": err.message});
        console.log(err.message);
        
    }
})
  

app.use('/', (req, res)=>{
  
    res.send('<h1>hello</h1>')
})
app.use(express.static('public', {
  setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
      }
  }
}));

 
app.listen(3000)


