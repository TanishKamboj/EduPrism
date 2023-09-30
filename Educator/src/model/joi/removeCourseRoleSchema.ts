import Joi from 'joi';
 
const removeCourseRoleSchema = Joi.object({
  user_id : Joi.string().required(),
  course_role_id: Joi.number().integer().required(),
  course_id : Joi.string().required()
  }).unknown(true);
export default removeCourseRoleSchema;


