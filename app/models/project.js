const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
    title : {type : String , required : true},// عنوان پروژه
    text : {type : String},//توضیحات پروژه هست 
    image: {type :String ,default : "/defaults/default-pro.jpg"},
    owner : {type : mongoose.Types.ObjectId , required : true},// رئیس پزوژه 
    team : {type : mongoose.Types.ObjectId},//کدوم تیم روش کار می کنه
    Private : {type : Boolean , default : true},
    // ما مقدار پرایوت از نوع بولین و دیفالت اون رو خصوصی بودن قرار دادیم
} , {
    timestamps : true
});
const ProjectModel = mongoose.model("project", ProjectSchema); // تو دیتابیس برو و یک دیتای جدید بساز اسمش بزار یوزر چون دیتابیس یه اس اضافه می کنه بهش و می شه یوزرز 
module.exports = {
   ProjectModel
}