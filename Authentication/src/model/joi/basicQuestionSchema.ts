import Joi from "joi" 
const basicQuestionSchema= Joi.object({
    career_goal_id : Joi.number().required(),
    skill_interests :  Joi.array().items(Joi.number()).required(),
}).unknown(true)
export default basicQuestionSchema;