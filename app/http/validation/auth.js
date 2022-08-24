// ما برای اعتبار سنجی داده هامون نیاز به یک  پکیج داریم
//https://express-validator.github.io/docs/
// اسمش هست اکسپرس ولیدیتور
const {body} = require ("express-validator") // می یام و متود هاش می دیم به بادی
const { UserModel } = require("../../models/user")
function registerValidator() {
    return [
        // از ریترن استفاده می کنیم چون قراره اطلاعات برگردونیم 
        body("username").custom(async (value , ctx) =>{
            if(value){
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if(usernameRegex.test(value)){
                    const user = await UserModel.findOne({username : value})
                    if(user) throw "این نام کاربری قبلا استفاده شده است"
                    return true
                }
                throw "نام کاربری صحیح نمی باشد"
            }else {
                throw " نام کاربری نمی تواند خالی باشد"
            }
        }),
        body("email").isEmail().withMessage("ایمیل وارد شده صحیح نمی باشد").custom(async email =>{
            const user = await UserModel.findOne({email})
            if(user) throw "ایمیل وارد شده قبلا استفاده شده است"
            return true
        }),
        body("mobile").isMobilePhone("fa-IR").withMessage("شماره تماس وارد شده صحیح نمی باشد").custom(async mobile =>{
            const user = await UserModel.findOne({mobile})
            if(user)throw "شماره موبایل وارد شده تکراری می باشد"
            return true
        }),
        body("password").isLength({min : 6 , max : 16}).withMessage("رمز عبور حداقل باید 6 و حداکثر 16 کاراکتر باشد")
            .custom((value , ctx)=> {
                if(!value)throw "رمز عبور نمی تواند خالی باشد" ;
                if(value !== ctx?.req?.body?.confirm_password) throw "رمز عبور با تکرار آن یکسان نمی باشد";
                return true
            })
    
    ]
}

module.exports = {
    registerValidator
}