const { AuthController } = require("../http/controllers/auth.controller");
const { registerValidator , loginValidator } = require("../http/validation/auth");
const router = require("express").Router();
const {expressValidatorMapper} = require("../http/middlewares/checkErrors")

router.post("/register" , registerValidator() , expressValidatorMapper , AuthController.register);

/* 
    الان اگه کسی بیاد تو سایت و بره به آدرس ریجستر می یاد اینجا ! 
    اول می ره و اطلاعات ورودی توسط کاربر و اعتبار سنجی می کنه
*/
router.post("/login" , loginValidator() , expressValidatorMapper , AuthController.login);
module.exports = {
    authRoutes : router // اینجوری باعث می شه که بتونیم روتر رو با اسم مورد نظر خودمون فراخوانی کنیم
}