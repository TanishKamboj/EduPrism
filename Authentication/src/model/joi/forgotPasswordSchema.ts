import Joi from "joi" 
const forgotPasswordSchema= Joi.object({
    email : Joi.string().email({
        minDomainSegments : 2,
        tlds : {allow : ["com","net","in"]}
    }).required()
}).unknown(true)
export {forgotPasswordSchema};