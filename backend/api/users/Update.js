const express = require('express')
const  bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');

dotenv.config()
const url = process.env.URL
const { MongoClient} = require('mongodb');
const register = require('../../model/usermodal/Register');
app.use(bodyParser.json());
app.use(express.json());
const router = express.Router();

router.put('/user_profile_update', (req, res)=>{
    const {email, name, old_email} = req.body;

    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("users");
    collection.updateOne(
        {email: old_email},
        {$set:{name: name, email: email}}



    ).then(()=>{
        res.send("updated successfully")

    })
   
})

module.exports = router;