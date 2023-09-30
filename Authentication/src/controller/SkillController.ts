import { Request,Response } from "express";
import resources from "../utils/resources";
import sendError from "../utils/sendError";
import sendSuccess from "../utils/sendSuccess";
import SkillServices from "../services/SkillServices";
import { checkServiceError } from "../utils/catachServiceError";

const getSkillByIndustry = async (req:Request,res:Response) =>{
    try{
        const {page , limit,industry_id} = req.query;
        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 3;
        const currIndustryID = industry_id?.toString() || " ";
        const getSkillData = await SkillServices.getSkillByIdustryId(currIndustryID,pageNumber,limitNumber);
        await checkServiceError(getSkillData);
        
        sendSuccess.sendSuccessResponsePagination(res,200, getSkillData.data || {},pageNumber,getSkillData.total_documents || 0);
    }catch(err){
        sendError.sendOtherError(res,500,resources.messages.error.generic(err as Error))
    }
}

export default {getSkillByIndustry};