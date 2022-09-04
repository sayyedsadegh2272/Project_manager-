const fileupload=require("express-fileupload");
const path = require ("path");
const { createUploadPath } = require("./functions");

const uploadFile = async (req , res , next) =>{
    try {
        if(req.file || Object.keys(req.files).length == 0 ) throw {status: 400 , message : "لطفا تصویر شاخص پروژه را ارسال کنید "}
        // we use this if for any option maybe , the user don't upload a file 
        let image = req.files.image // this is for get image from req 
        const image_path = path.join(createUploadPath() , (Date.now() + path.extname(image.name)))
        // this is half of image path
        req.body.image = image_path
        let uploadPath = path.join(__dirname , ".." , ".." , image_path);
        //this compleat path of file , it is upload.
        console.log(uploadPath);
        image.mv(uploadPath , (err) =>{ // mv is one of image function to move the file to path upload
            console.log(err);
            if(err) throw {status : 500 , message : "بارگذاری تصویر انجام نشد"}
            next()
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    uploadFile
}