const mongoose = require('mongoose');

const courses_scehema = new mongoose.Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    price:{
        type: Number
    },
    duration:{
        type: String
    },
    projects:{
        type: Number
    },
    languages:{
        type: String
    },
    type:{
        type: String
    }
   
})

const courses = mongoose.model('courses', courses_scehema);
module.exports = courses;
