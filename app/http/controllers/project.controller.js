// چه کارهایی در رابطه با پروژه قراره انجام بدیم ؟
//مثلا ما باید پروژه جدید بسازیم ، پروژه های قدیمی رو ببینیم و ....
const {ProjectModel} = require("../../models/project");

class ProjectController {
    async createProject (req , res , next){
      try {
        const {title , text , image} = req.body;
        const owner = req.user._id
        const result = await ProjectModel.create({title , text , owner , image});
        if(!result) throw{status : 400 , message : "افزودن پروژه با مشکل مواجه شد"}
        return res.status(201).json({
            status : 201 , 
            success : true ,
            message : "پروژه با موفقیت ایجاد شد"
        })
      } catch (error) {
        next(error)
      }
    }
    async getAllProject(req , res , next){
      try {
        const owner = req.user._id;
        const projects= await ProjectModel.find({owner});
        // this mean => you find project based on owner
        return res.status(200).json({
          status : 200 , 
          success : true ,
          projects
        }) 
      } catch (error) {
        next(error)
      }
    }
    getProjectById(){

    }
    getAllProjectOfTeam(){

    }
    getProjectOfUser(){

    }
    updateProject(){

    }
    removeProject(){

    }
}

module.exports = {
    ProjectController : new ProjectController()
}