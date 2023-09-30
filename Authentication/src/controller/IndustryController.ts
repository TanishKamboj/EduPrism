import { Request,Response } from "express";
import resources from "../utils/resources";
import sendError from "../utils/sendError";
import sendSuccess from "../utils/sendSuccess";
import IndustryServices from "../services/IndustryServices";
import {checkServiceError} from "../utils/catachServiceError";
export default {
    async getAllIndustry(req: Request, res:Response){
        try{
            const {page , limit} = req.query;
            const pageNumber = Number(page) || 1;
            const limitNumber = Number(limit) || 3;
            
            const getAllIndustry = await IndustryServices.getAllIndustry(pageNumber,limitNumber);
            await checkServiceError(getAllIndustry);
            
            const industryData = getAllIndustry.data || {}
            sendSuccess.sendSuccessResponsePagination(res,200,industryData,pageNumber,getAllIndustry.total_documents || -1);
            
        
        }catch(err){
            sendError.sendOtherError(res,500,resources.messages.error.generic(err as Error))
        }
    }
}