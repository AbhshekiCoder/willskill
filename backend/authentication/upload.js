import multer  from 'multer';
import path  from  'path';
import {fileURLToPath }  from 'url';

let storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        let _filename = fileURLToPath(import.meta.url); 
        let __dirname = path.dirname(_filename)
        console.log(__dirname)
        const uploadDir = path.join(__dirname, '../api/teachers/images/');
        console.log(uploadDir)
         cb(null, uploadDir);
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + file.originalname);
    }
})


const upload = multer({storage: storage})

export default upload;

