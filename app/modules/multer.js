const multer = require("multer");
const { createUploadPath } = require("./functions");
const path = require("path");
const storage = multer.diskStorage({
    destination : (req , file , cb)=>{
        cb(null , createUploadPath())//null mean : the error is empty
    },
    filename:(req , file , cb) => {
        const type = path.extname(file?.originalname || "")// this is for get type of file , like jpg
        cb(null , Date.now() + type)
    }
});

const upload_multer = multer({storage})
module.exports = {
    upload_multer
}