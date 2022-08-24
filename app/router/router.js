const { authRoutes } = require("./auth");
const { projectRoutes } = require("./project");
const { userRoutes } = require("./user");
const {teamRoutes} = require("./team");

const router = require("express").Router();

router.use("/auth" , authRoutes)
router.use("/project" , projectRoutes)
router.use("/team" , teamRoutes)
router.use("/user" , userRoutes)
module.exports = {
    AllRoutes : router // اینجوری باعث می شه که بتونیم روتر رو با اسم مورد نظر خودمون فراخوانی کنیم
}