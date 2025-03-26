const mongoose = require('mongoose');


const updateSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true

    },
    email:{
        type: String,
        require: true

    }
})

let update =  mongoose.model('update', updateSchema);

module.exports = update;