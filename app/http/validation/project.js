const { body } = require("express-validator");


function createProjectValidator(){
    return [
        body("title").notEmpty().withMessage("عنوان پروژه نمی تواند خالی باشد"),
        body("tags").isArray({min : 0 , mak : 10}).withMessage("حداکثر استفاده از هشتگ ها 10 عدد می باشد"),
        body("text").notEmpty().isLength({min : 20}).withMessage("توضیحات پروژه نمی تواند خالی باشد و حداقل باید 25 کاراکتر باشد"),
        // is length => mean : the character of text must be more than 20 character ! 
            
    ]
}

module.exports = {
    createProjectValidator
}