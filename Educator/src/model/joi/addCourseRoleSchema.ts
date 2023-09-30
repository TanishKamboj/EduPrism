import Joi from 'joi';
 
const addCourseRoleSchema = Joi.object({
  email : Joi.string().email({
    minDomainSegments : 2,
    tlds : {allow : ["com","net","in"]}
}).required(),
  course_role_id: Joi.number().integer().required(),
  course_id : Joi.string().required()
  }).unknown(true);
export default addCourseRoleSchema;


