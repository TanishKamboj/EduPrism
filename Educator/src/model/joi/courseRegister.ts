import Joi from 'joi';
 
const courseRegisterSchema = Joi.object({
    course_title: Joi.string().required(),
    course_short_description: Joi.string().required(),
    course_skill_id : Joi.number().required(),
    course_price_amount : Joi.number().required(),
    currency_id : Joi.number().required()
  }).unknown(true);
export default courseRegisterSchema;