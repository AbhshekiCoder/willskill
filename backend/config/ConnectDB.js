let mongoose = require('mongoose');
let dotenv = require('dotenv');
let express = require('express');
dotenv.config();
let url = process.env.URL;
function mongodbConnect(){
    mongoose.connect(url).then(()=>{
        console.log('connected');



        
    }).catch((err)=>{
        console.log(err.message);
    })

}
module.exports = mongodbConnect;