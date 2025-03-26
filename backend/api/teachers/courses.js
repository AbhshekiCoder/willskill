const express = require('express')
const  bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');

dotenv.config()
const url = process.env.URL
const { MongoClient} = require('mongodb');
const courses = require('../../model/TeacherModal/courses');
const bcrypt = require('bcrypt');

app.use(bodyParser.json());
app.use(express.json());
const router = express.Router();

router.post('/courses', async(req, res) =>{
    const{name, detail, price, duration, projects, languages, type} = req.body;
    console.log(duration)
    
    try{
       
        let obj = new courses({
            title: name,
            description: detail,
            price: price,
            duration: duration,
            projects: projects,
            languages: languages,
            type: type
           

        });
        let client = new MongoClient(url);
        let db = client.db("Tech_Temple");
        let collection = db.collection("courses");
        collection.insertOne(obj).then(()=>{
            res.send("successfully updated");
        })
    }catch(err){
        console.log(err);
    }
    })

module.exports = router;