const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'profile/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    } 
});

const fileFilter = (req,file,cb) =>{
    if(file.mimetype ==='image/jpeg' ||file.mimetype ==='image/png'){
        cb(null,true);
    }else{
        req.error = "Only jpeg and png allowed"
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