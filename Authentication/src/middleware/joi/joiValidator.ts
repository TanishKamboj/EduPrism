import { Request,Response, NextFunction } from 'express';
import signUpSchema from '../../model/joi/signUpSchema';
import loginSchema from '../../model/joi/loginSchema';
import {forgotPasswordSchema} from '../../model/joi/forgotPasswordSchema'
import resetPasswordSchema from '../../model/joi/resetPasswordSchema';
import basicQuestionSchema from '../../model/joi/basicQuestionSchema';
import resources from '../../utils/resources';
export default{
    signUpMiddleware: async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { error } = signUpSchema.validate(req.body, { abortEarly: false });
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
    loginMiddleware :async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error } = loginSchema.validate(req.body, { abortEarly: false });
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
    forgotPasswordMiddleware : async(req: Request, res: Response, next: NextFunction)=>{
      try {
        const { error } = forgotPasswordSchema.validate(req.body, { abortEarly: false });
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
    resetPasswordMiddleware : async(req: Request, res: Response, next: NextFunction)=>{
      try {
        const { error } = resetPasswordSchema.validate(req.body, { abortEarly: false });
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
    basicQuestionMiddleware : async(req: Request, res: Response, next: NextFunction)=>{
      try {
        const { error } = basicQuestionSchema.validate(req.body, { abortEarly: false });
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
