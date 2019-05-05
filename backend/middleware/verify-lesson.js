const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'lessons/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    } 
});

const fileFilter = (req,file,cb) =>{
    if(file.mimetype ==='application/pdf' ||file.mimetype ==='video/mp4'){
        cb(null,true);
    }else{
        req.error = "Only pdf and mp4 files allowed. Unauthorized for other mime types"
        cb(null,false);
    }
}
const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*10
    },
    fileFilter:fileFilter
});
module.exports = upload;