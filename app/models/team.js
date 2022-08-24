const mongoose = require("mongoose");
const TeamSchema = new mongoose.Schema({
    name : {type : String , required : true},
    description : {type : String},//توضیحات تیم هست 
    users: {type : [mongoose.Types.ObjectId],default : []},//تایپش از آبجکت آیدی داخل یک آریه قرار دادیم 
    //یعنی یک آرایه ای از آبجکت آیدی ها قراره تو یوزرز ها ذخیره بشه
    owner : {type : mongoose.Types.ObjectId , required : true},// مدیر تیم رو بر اساس آبجکت آیدی باید تعیین کنیم 
    },{
    timestamps : true
});
const TeamModel = mongoose.model("team" , TeamSchema); // تو دیتابیس برو و یک دیتای جدید بساز اسمش بزار یوزر چون دیتابیس یه اس اضافه می کنه بهش و می شه یوزرز 
module.exports = {
    TeamModel
}