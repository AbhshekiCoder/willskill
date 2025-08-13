import mongoose from "mongoose";

let contact_schema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    description:{
        type: String
    }
})

let customer_contact = mongoose.model('customer_contact', contact_schema);

export default customer_contact;