import express  from 'express'
import   bodyParser from 'body-parser';
const app = express();
import dotenv from 'dotenv';

dotenv.config()
const url = process.env.URL
 import  { MongoClient} from 'mongodb';
 import jwt from 'jsonwebtoken';

 import courses from '../../model/TeacherModal/courses.js';
import bcrypt from 'bcrypt';
import upload from '../../authentication/upload.js';
import path  from  'path';
import {fileURLToPath }  from 'url';
import fs from 'fs'
app.use(bodyParser.json());
app.use(express.json());
const router = express.Router();

router.post('/courses', upload.single('file'), async(req, res) =>{
     const client = new MongoClient(url);
        const db = client.db("Tech_Temple");
        const collection = db.collection("courses");
    const{name, detail, price, duration, projects, languages, type} = req.body;
      let _filename = fileURLToPath(import.meta.url); 
         let __dirname = path.dirname(_filename)

    let currentDate = new Date();
    let month = currentDate.getMonth() + 1; // Months are zero-indexed (0-11)
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();
    
    // Ensure the day and month are two digits if necessary
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    
    // Create the formatted date string
    let formattedDate = month + '/' + day + '/' + year;

    let currentDate1 = new Date();

// Add 2 weeks (14 days)
currentDate1.setDate(currentDate1.getDate() + (7 * duration.split(' ')[0]));

// Format the date as MM/DD/YYYY
let month1 = currentDate1.getMonth() + 1; // Months are zero-indexed (0-11)
let day1 = currentDate1.getDate();
let year1 = currentDate1.getFullYear();

// Ensure the day and month are two digits if necessary
month1 = month1 < 10 ? '0' + month1 : month1;
day1 = day1 < 10 ? '0' + day1 : day1;

// Create the formatted date string
let formattedDate1 = month1 + '/' + day1 + '/' + year1;

console.log(formattedDate1);
    try{
       
        let obj = {
            title: name,
            description: detail,
            price: price,
            duration: duration,
            projects: projects,
            languages: languages,
            type: type,
            image: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)),
            start_date: formattedDate,
            end_date:  formattedDate1,
            imageType: req.file.mimetype

        };
        let client = new MongoClient(url);
        let db = client.db("Tech_Temple");
        let collection = db.collection("courses");
        collection.findOne({title: name }).then(result =>{
            if(result){
                res.send({success: false, message: "this subject is already enrolled"})

            }
            else{
                collection.insertOne(obj).then(()=>{
                    res.send({success: true, message: "successfully updated"});
                })
            }
        })
      
            
        
    }catch(err){
        console.log(err);
    }
    })

export default router