// قراره موارد مربوط به بررسی صحیح بودن ورود و خروج کاربر به سایت رو انجام بدیم
const { validationResult } =require ("express-validator");
const { UserModel } = require("../../models/user");
const { expressValidatorMapper, hashString , tokenGenerator} = require("../../modules/functions");
const bcrypt = require("bcrypt");
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
    async login (req , res , next) {
        try {
            const {username , password} = req.body
            console.log(req.headers)
            const user = await UserModel.findOne({username});
            if(!user)throw{status:401 , massage : "نام کاربری یا رمز عبور صحیح نمی باشد"};
            const comparResult = bcrypt.compareSync(password , user.password);
            if(!comparResult) throw{status : 401 , massage : "نام کاربری یا رمز عبور صحیح نمی باشد"};
            const token = tokenGenerator({username});
            user.token = token
            await user.save()
            return res.status(200).json({
                status : 200 , 
                success : true , 
                massage : "شما با موفقیت وارد حساب کاربری خود شدید",
                token 
            })
        } catch (error) {
            next(error)
        }
    }
    resetPassword(){

    }
}
module.exports = {
    AuthController : new AuthController()
}