import dotenv from 'dotenv';
dotenv.config();
import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';
import resources from '../../utils/resources';

const verifyJwtTokenPrivate =async (req:Request,res:Response,next:NextFunction) => {
    const authorizationHeader = req.headers['authorization'] || " ";
    if (authorizationHeader != undefined && !authorizationHeader.startsWith('Bearer ')){
      return res.status(401).json({
          status: resources.status.fail,
          error: 'Authentication failed: Token missing',
        });
    }
  const token = authorizationHeader.split(' ')[1];
  try{
    const decodedToken = jwt.verify(token,process.env.JWT_TOKEN_KEY || " ");
    req.headers['x-user-data'] = JSON.stringify(decodedToken);
    next();
  }catch(err){
    return res.status(401).json({
      status: resources.status.fail,
      error: 'Authentication failed: Invalid or expired token',
    });
  }
}
export {verifyJwtTokenPrivate}