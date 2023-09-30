import { Request,Response, NextFunction } from 'express';
import registerEducatorSchema from '../../model/joi/registerEducatorSchema';
import courseRegisterSchema from '../../model/joi/courseRegister';
import resources from '../../utils/resources';
import addCourseRoleSchema from '../../model/joi/addCourseRoleSchema';
import removeCourseRoleSchema from '../../model/joi/removeCourseRoleSchema';
export default {
    registerEducatorMiddleware: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error } = registerEducatorSchema.validate(req.body, { abortEarly: false });
            if (error) {
              return res.status(400).json({
                status: resources.status.fail,
                error: error.details[0].message,
              });
            } 
            next();
          } catch (err) {
          return res.status(500).json({ error: 'Failed to Validate joi error' });
        }
    },
    courseRegisterMiddleware: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error } = courseRegisterSchema.validate(req.body, { abortEarly: false });
            if (error) {
              return res.status(400).json({
                status: resources.status.fail,
                error: error.details[0].message,
              });
            } 
            next();
          } catch (err) {
          return res.status(500).json({ error: 'Failed to Validate joi error' });
        }
    },
    removeCourseRoleMiddleware: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error } = removeCourseRoleSchema.validate(req.body, { abortEarly: false });
            if (error) {
              return res.status(400).json({
                status: resources.status.fail,
                error: error.details[0].message,
              });
            } 
            next();
          } catch (err) {
          return res.status(500).json({ error: 'Failed to Validate joi error' });
        }
    },
    addCourseRoleMiddleware: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error } = addCourseRoleSchema.validate(req.body, { abortEarly: false });
            if (error) {
              return res.status(400).json({
                status: resources.status.fail,
                error: error.details[0].message,
              });
            } 
            next();
          } catch (err) {
          return res.status(500).json({ error: 'Failed to Validate joi error' });
        }
    },

}