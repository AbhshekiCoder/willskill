let mongoose = require('mongoose');

let AdminSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        }

})

let AdminModel = mongoose.model('admin', AdminSchema);

module.exports = AdminModel;