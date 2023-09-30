import Joi from "joi" 
const resetPasswordSchema= Joi.object({
    password : Joi.string().required(),
    confirm_password : Joi.string().valid(Joi.ref('password')).required(),
}).unknown(true)
export default resetPasswordSchema;