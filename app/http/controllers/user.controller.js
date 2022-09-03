const { UserModel } = require("../../models/user");

/* 
قراره اینجا تمام کارهایی که یوزر تو سایت انجام می ده رو داشته باشیم 

*/
class UserController{
    getProfile(req , res , next){
        // اطلاعات یوزر رو نمایش می ده
        try {
            const user = req.user;
            user.profile_image = req.protocol + "://" + req.get("host") + "/" + (user.profile_image.replace(/[\\\\]/gm , "/"))
            // we did line up for show address os image in host like a link
            return res.status(200).json({
                status : 200 ,
                success : true,
                user
            })
        } catch (error) {
            next(error)
        }
    }
   async editProfile(req , res , next){
        // بتونه اطلاعات خودش ویرایش کنه
        try {
            let data = req.body
            const userID = req.user._id
            let fields = ["first_name" , "last_name" , "skills"]//this is skill of fields we have get from body
            let badValues  = ["" , " " , null , undefined , 0 , -1 , NaN , [] , {}];
            //this is a array af fields , we never use them
            Object.entries(data).forEach(([key , value])=>{//entries use for => ring on array has key and value
                if(!fields.includes(key)) delete data[key]//if field empty => delete key(name of filed)
                if(badValues.includes(value)) delete data[key]; //
            })
            console.log(data);
            const result = await UserModel.updateOne({_id : userID} , {$set : data})
            if(result.modifiedCount > 0 ) {
                return res.status(200).json({
                    status : 200 , 
                    success : true , 
                    message : "به روز رسانی با موفقیت انجام شد"
                })
            }
            throw {status : 400 , message : "به روز رسانی انجام نشد"}
        } catch (error) {
            next(error)
        }
    }
    async uploadProfileImage(req , res , next){
        try {
            const userID = req.user._id
            const filePath = req.file?.path?.substring(7)
            //whit substring we can show pice of array , 
            //it has 2 params => first param is start index and 2 param is end index 
            const result = await UserModel.updateOne({_id : userID} , {$set : {profile_image : filePath}})
            if(result.modifiedCount == 0 ) throw {status : 400 , message : "به روزرسانی انجام نشد"}
            return res.status(200).json({
                status : 200 , 
                message : true , 
                message : "به روز رسانی با موفقیت انجام شد"
            })
        } catch (error) {
            next (error)
        }
    }
    addSkills(){
        // بتونه مهارت جدید برای خودش تعریف کنه 
    }
    editSkills(){
        // ممکنه بخواد سطح یه مهارت تغییر بده یا اون حذف کنه
    }
    acceptInviteInTeam(){
        //تو قسمت تیم ها گفتیم که می تونیم یوزر به تیم اضافه کنیم 
        // حالا متود اینجا قراره به یوزر امکان بده که قبول کنه به تیم اضافه بشه
    }
    rejectInviteInTeam(){
        // رد درخواست ورود به تیم
    }
}
module.exports = {
    UserController : new UserController ()
}