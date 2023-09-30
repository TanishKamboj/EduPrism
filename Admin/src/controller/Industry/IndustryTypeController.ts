import { Request,Response } from "express";
import sendError from "../../utils/sendError"; 
import sendSuccess from "../../utils/sendSuccess";
import resources from "../../utils/resources";
import industryTypeService from "../../services/industryTypeService";
export default {
    async addIndustryType(req:Request,res:Response){
        try{
            const industryRequest = req.body;
            const industryServiceRequest = await industryTypeService.insertNewIndustryType(industryRequest);
            if(industryServiceRequest.status == resources.status.fail){
                const errorMessage = industryServiceRequest.message || resources.messages.error.unknown;
                return sendError.sendOtherError(res,500,errorMessage);
            }
            const industryServiceData = industryServiceRequest.data || {};
            sendSuccess.sendSuccessResponse(res,200,industryServiceData);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    }
}