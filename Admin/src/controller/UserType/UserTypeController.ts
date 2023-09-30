import { Request,Response } from "express";
import sendError from "../../utils/sendError"; 
import sendSuccess from "../../utils/sendSuccess";
import resources from "../../utils/resources";
import userTypeService from "../../services/userTypeService";
export default {
    async addUserType(req:Request,res:Response){
        try{
            const userRequest = req.body;
            const userTypeServiceRequest = await userTypeService.insertUserType(userRequest);
            if(userTypeServiceRequest.status === resources.status.fail){
                const errorMessage = userTypeServiceRequest.message || resources.messages.error.unknown;
                return sendError.sendOtherError(res,500,errorMessage);
            }
            const userTypeData = userTypeServiceRequest.data || {};
            sendSuccess.sendSuccessResponse(res,200,userTypeData);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    }
}