import express  from 'express'
import   bodyParser from 'body-parser';
const app = express();
import dotenv from 'dotenv';

dotenv.config()
const url = process.env.URL
 import  { MongoClient} from 'mongodb';


import fs from 'fs';
import path from 'path';


app.use(bodyParser.json());
app.use(express.json());
const router = express.Router();
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        const uploadDir = path.join(__dirname, '/upload/');
        cb(null, uploadDir);

    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + '' + file.originalname);
    }
})
var upload = multer({storage: storage});
router.post('/user_review', upload.single('file'), async(req, res) =>{
    const {name, technology, description, type, rating} = req.body;
    
   
  
    const client = new MongoClient(url);
    const db = client.db("Tech_Temple");
    const collection = db.collection("review")  ;
    const obj = {
        name: name,
        technology: technology,
        description: description,
        img: fs.readFileSync(path.join(__dirname + "/upload/" + req.file.filename )),
        type: type,
        rating: rating
    }
    try{
      
        let result =  await collection.insertOne(obj).then(()=>{
            res.send("updated");
        })
           
    }catch(err){
        console.log(err.message);
    }
})

export default router;