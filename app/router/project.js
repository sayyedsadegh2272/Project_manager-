const { createProjectValidator } = require("../http/validation/project");
const {expressValidatorMapper} = require("../http/middlewares/checkErrors");
const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { uploadFile } = require("../modules/express-fileupload");
const fileupload=require("express-fileupload");
const router = require("express").Router();

router.post("/create" ,fileupload(), checkLogin ,uploadFile, createProjectValidator() , expressValidatorMapper , ProjectController.createProject )
// in expressValidatorMapper we don't use () because it is a middleware 
module.exports = {
    projectRoutes : router // اینجوری باعث می شه که بتونیم روتر رو با اسم مورد نظر خودمون فراخوانی کنیم
}
