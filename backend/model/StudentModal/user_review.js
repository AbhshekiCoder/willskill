import mongoose from "mongoose";

let user_review_schema = new mongoose.Schema({
    name: {
        type: String
    },
    technology:{
        type: String
    },
    description:{
        type: String
    },
    img:{
        type: Buffer
    }


})

const user_review =  mongoose.model('user_review', user_review_schema);

export default user_review;