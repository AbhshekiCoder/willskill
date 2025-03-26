const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const mongodbConnect = require('./config/ConnectDB');
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())


const register = require('./api/users/Register');
const login = require('./api/users/Login');
const user_profile_update = require('./api/users/Update');
const user_password_reset = require('./api/users/Password_Reset');
const register_apps = require('./api/users/register_apps');
const user_detail = require('./api/users/user_detail');
const jwt = require('jsonwebtoken');
const courses = require('./api/teachers/courses');
const user_review = require('./api/student/user_review');
const review = require('./api/fetch/review');
const customer_contact = require('./api/users/customer_contact');
const signin = require('./api/users/signin')
const dotenv = require('dotenv');
const enroll_courses = require('./api/fetch/coursesenroll.js')
const quiz = require('./api/fetch/quiz')
const adminsignup = require('./api/admin/adminsignup.js')
const module_submit = require('./api/teachers/muodule_submit.js');
const course_detail = require('./api/fetch/course_detail.js');
const { appendFile } = require('fs');
const payment = require('./api/users/payment.js');
const enroll = require('./api/users/enroll.js');



let url =  process.env.URL;

mongodbConnect();

app.use('/register', register);
app.use('/login', login);
app.use('/user_profile_update', user_profile_update);
app.use('/user_password_reset', user_password_reset);
app.use('/register_apps', register_apps);
app.use('/user_detail', user_detail);
app.use('/courses', courses);
app.use('/user_review', user_review)
app.use('/review', review)
app.use('/customer_contact', customer_contact);
app.use('/signin', signin)
app.use('/enroll_courses/:id', enroll_courses)
app.use('/quiz', quiz)
app.use('/adminsignup', adminsignup);
app.use('/module_submit', module_submit )
app.use('/course_detail/:id', course_detail)
app.use('/payment', payment)
app.use('/enroll', enroll)
app.post('/course_detail', (req, res)=>{
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
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


