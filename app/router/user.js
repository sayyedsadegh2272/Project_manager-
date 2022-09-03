const { UserController } = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { imageValidator } = require("../http/validation/user");
const { upload_multer } = require("../modules/multer");
const {expressValidatorMapper} = require("../http/middlewares/checkErrors")

const router = require("express").Router();

router.get("/profile" , checkLogin , UserController.getProfile)
router.post("/profile" , checkLogin , UserController.editProfile)
router.post("/profile-image" , 
    upload_multer.single("image") ,
    imageValidator() , expressValidatorMapper ,
    checkLogin , UserController.uploadProfileImage)
    
module.exports = {
    userRoutes : router // اینجوری باعث می شه که بتونیم روتر رو با اسم مورد نظر خودمون فراخوانی کنیم
}