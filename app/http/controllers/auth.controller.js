// قراره موارد مربوط به بررسی صحیح بودن ورود و خروج کاربر به سایت رو انجام بدیم
const { validationResult } =require ("express-validator");
const { UserModel } = require("../../models/user");
const { expressValidatorMapper, hashString } = require("../../modules/functions");

class AuthController{
    async register(req , res , next){ // ثبت نام
        try {
            const {username , password , email , mobile} = req.body;
            const hash_password = hashString (password);
            const user = await UserModel.create({username , password : hash_password, email , mobile})
            .catch(err =>{
                if(err?.code == 11000){
                    throw {status : 400 , massage : "این نام کاربری در سیستم موجود می باشد"}
                }
            })
        } catch (error) {
            next(error)
        }
        

        return res.json(user)
    }
    login () {

    }
    resetPassword(){

    }
}
module.exports = {
    AuthController : new AuthController()
}