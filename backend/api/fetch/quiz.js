const express = require('express')
const  bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');

dotenv.config()
const url = process.env.URL
const { MongoClient} = require('mongodb');


app.use(bodyParser.json());
app.use(express.json());
const router = express.Router();




router.get('/quiz', (req, res) =>{
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("quiz");
    try{
        collection.find().toArray().then(result =>{
            res.send(result);
        })
    }
    catch(err){
        console.log(err.message);
        
    }
    
})
module.exports = router;