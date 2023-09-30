import Joi from "joi" 
const loginSchema= Joi.object({
    email : Joi.string().email({
        minDomainSegments : 2,
        tlds : {allow : ["com","net","in"]}
    }).required(),
    password : Joi.string().required(),

}).unknown(true)
export default loginSchema;