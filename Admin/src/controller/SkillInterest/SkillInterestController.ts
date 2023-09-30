import { Request,Response } from "express";
import sendError from "../../utils/sendError"; 
import sendSuccess from "../../utils/sendSuccess";
import resources from "../../utils/resources";
import skillInterestService from "../../services/skillInterestService";
export default {
    async addSkillInterset(req:Request,res:Response){
        try{
            const skillRequest = req.body;
            const skillServiceRequest = await skillInterestService.insertNewIndustryType(skillRequest);
            if(skillServiceRequest.status === resources.status.fail){
                const errorMessage = skillServiceRequest.message || resources.messages.error.unknown;
                return sendError.sendOtherError(res,500,errorMessage);
            }
            const sillServiceData = skillServiceRequest.data || {};
            sendSuccess.sendSuccessResponse(res,200,sillServiceData);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    }
}