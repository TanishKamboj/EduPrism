import Joi from 'joi';
 
const registerEducatorSchema = Joi.object({
    educator_description: Joi.string().required(),
    twitter_url: Joi.string().uri({
      scheme: ['http', 'https'],
      allowRelative : false,
    }),
    linkedin_url: Joi.string().uri({
      scheme: ['http', 'https'],
      allowRelative : false,
    }),
    portfolio_website_url: Joi.string().uri({
      scheme: ['http', 'https'],
      allowRelative : false,
    })
  }).unknown(true);
export default registerEducatorSchema;