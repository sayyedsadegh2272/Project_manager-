const { validationResult } =require ("express-validator");

function expressValidatorMapper(req , res , next) {
    let massages = {};
    const result = validationResult(req);
    if(result?.errors?.length> 0) {
        result?.errors.forEach((err)=>{
            massages [err.param] = err.msg
        });
        return res.status(400).json({
            status : 400 , 
            success: false , 
            massages
        });
    }
    next()
};

module.exports = {
    expressValidatorMapper
}