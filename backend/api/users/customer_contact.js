const express = require('express')
const  bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');

dotenv.config()
const url = process.env.URL
const { MongoClient} = require('mongodb');
const customer_contact = require('../../model/usermodal/contact');
app.use(bodyParser.json());
app.use(express.json());
const router = express.Router();
router.post('/customer_contact', async(req, res) =>{
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
        collection.insertOne(obj).then(()=>{
            res.send({"success": true, "message": "successfully updated your query we resolve you query in quickly"})
        })
    }
    catch(err){
        res.send({"success": false, "message": err.message});
        console.log(err.message);
        
    }
})

module.exports = router;