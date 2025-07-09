import express  from 'express'
import   bodyParser from 'body-parser';
const app = express();
import dotenv from 'dotenv';

dotenv.config()
const url = process.env.URL
 import  { MongoClient} from 'mongodb';
 import jwt from 'jsonwebtoken';



app.use(bodyParser.json());
app.use(express.json());
const searchCourses  = express.Router();



searchCourses.get('/searchcourses/:title', (req, res) =>{
    const {title} = req.params;
    let Title = title.toUpperCase()
    console.log(Title)
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("courses");
    try{

        collection.find().toArray().then(result =>{
           
             let searchWords = title.toUpperCase().split(" ");

let array = result.filter(Element => {
  let courseTitle = Element.title.toUpperCase();
  return searchWords.some(word => courseTitle.includes(word));
});

            if(array.length > 0){
             res.send({success: true, id:  array[0]._id});
            }else{
                res.send({success: false, message: "no course available"})
            }
        })
    }
    catch(err){
        console.log(err);
    }
});

export default searchCourses;