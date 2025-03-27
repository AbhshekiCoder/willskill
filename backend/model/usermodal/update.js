import mongoose from "mongoose";


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

export default update