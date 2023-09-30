import Joi from "joi" 
const signUpSchema= Joi.object({
    first_name : Joi.string().required(),
    last_name : Joi.string().required(),
    email : Joi.string().email({
        minDomainSegments : 2,
        tlds : {allow : ["com","net","in"]}
    }).required(),
    password : Joi.string().required(),
    confirm_password : Joi.string().valid(Joi.ref('password')).required(),
    phone_number : Joi.number().integer().min(1000000000).max(9999999999),
    date_of_birth: Joi.string().required()
}).unknown(true)
export default signUpSchema;