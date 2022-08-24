const { AllRoutes } = require("./router/router");
//https://ditty.ir/courses/es6/classes/5vV95#constructor-method اطلاعات در مورد کلاس ها
module.exports = class Application {
    #express = require("express");
    #app = this.#express();
    constructor(PORT , DB_URL){
        this.configDatabase(DB_URL)
        this.configApplication()
        this.createServer(PORT)
        this.createRoutes()
        this.errorHandler()
        
    }
    configApplication(){
        const path = require("path")
        this.#app.use(this.#express.json());//برای خواندن فایل هایی که به صورت جیسون هستند
        this.#app.use(this.#express.urlencoded({extended : true}));
        this.#app.use(this.#express.static(path.join(__dirname , ".." , "public")))
    }
    createServer(PORT){
        const http = require("http");
        const server = http.createServer(this.#app);
        server.listen(PORT , () =>{
            console.log(`Server Run > On http://localhost:${PORT}`);
        })
    }
    configDatabase(DB_URL){
        const mongoose = require("mongoose");
        mongoose.connect(DB_URL , (error) => {
            if(error) throw error
            return console.log("Connect to DB successful ");
        })
    }
    errorHandler(){
        this.#app.use((req, res , next) =>{
            return res.status(404).json({
                status : 404 , 
                success : false , 
                massage : "صفحه یا آدرس مورد نظر یافت نشد"
            })
        });
    }
    createRoutes(){
        this.#app.get("/" , (req , res , next) => { // این می شه صحفه اصلی سایت
            return res.json({
                massage : "this is a new Express application"
            })
        });
        this.#app.use(AllRoutes)

        // this.#app.use((err , req , res , next) =>{ // ما تو بدنه متود های از تری کچ استفاده می کنیم تا برای مهار کردن خطا و سپس انجام اقدام مناسب استفاده می‌کنیم.
        //     // اینجا قرارش می دیم و تمام روت ها مون می فرستیم توش 
        //     // دیگه اگه زمانی هم یادمون رفت جایی از ترای کچ استفاده کنیم این کافیه براش
        //     try {
        //         this.#app.use(AllRoutes)
        //     } catch (error) {
        //         next(error)
        //     }
        // })
    }
    
}