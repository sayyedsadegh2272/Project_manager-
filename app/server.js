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
        this.#app.get("/" , (req , res , next) => {
            return res.json({
                massage : "this is a new Express application"
            })
        })
    }
    
}