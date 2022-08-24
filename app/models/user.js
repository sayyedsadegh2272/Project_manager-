const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    first_name : {type : String},
    last_name : {type : String},
    username : {type : String , required : true , unique : true},//یونیک یعنی فقط یک یوزر نیم می تونه وجود داشته باشه ونمی تونه تکراری باشه
    mobile : {type : String , required : true , unique : true},
    roles : {type : [String] , default : ["USER"]},//دیفالت : یعنی اگه نقشی براش تعیین نشد بالاخره یوزر هست 
    // نکته خیلی مهم : وقتی دیفالت رو آرایه ای از استرینگ ها قرار دادی حتما باید تایپ رو آرایه ای از استرینگ بزاری
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    skills : {type : [String], default : []},//دیفالت رو آرایه خالی گذاشتیم چون ممکنه شخص مهارت داشته باشه ممکنه مهارت خاصی هم نداشته باشه
    team : {type : [mongoose.Types.ObjectId], default : []},// ممکنه شخص عضو تیم خاصی هم نباشه
    // چرا دیفالت ها رو آرایه تعریف کردی : چون چند احتمال وجود داره مثلا هم شخص یوزر باشه هم مدیر هم ...یا طرف عضو 5 تیم متفاوت باشه
    // تایپ رو ، آرایه ای از آبجکت آیدی های تیم ها قرار دادیم
},
{
    timestamps : true
});
const UserModel = mongoose.model("user" , UserSchema); // تو دیتابیس برو و یک دیتای جدید بساز اسمش بزار یوزر چون دیتابیس یه اس اضافه می کنه بهش و می شه یوزرز 
module.exports = {
    UserModel
}