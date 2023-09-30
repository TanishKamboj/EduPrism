import {Request,Response}  from "express";
import sendError from "../utils/sendError";
import UserServices from '../services/UserServices';
import EducatorServices from "../services/EducatorServices";
import { checkServiceError  } from "../utils/catachServiceError";
import sendSuccess from "../utils/sendSuccess";

export default { 
    async registerEducator(req :Request, res: Response){
        try{
            const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
            const user_id = userData.user_id; 
            const educatorInfo = {...req.body, user_id: user_id};
            
            const isUserPreset = await UserServices.isUserPreset(user_id ||" ");
            await checkServiceError(isUserPreset);

            const isEducatorPresent = await EducatorServices.isEducatorPresent(user_id);
            await checkServiceError(isEducatorPresent);
            
            const addNewEducator = await EducatorServices.createEducator(educatorInfo);
            await checkServiceError(addNewEducator);
            
            sendSuccess.sendSuccessResponse(res,200,addNewEducator.data || {});
        }catch(err){
            sendError.sendServerError(res,err as Error,500)
        }
    },
    
}
