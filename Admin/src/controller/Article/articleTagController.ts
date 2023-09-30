import { Request,Response } from "express";
import sendError from "../../utils/sendError"; 
import sendSuccess from "../../utils/sendSuccess";
import resources from "../../utils/resources";
import articleTagService from "../../services/articleTagService";

export default {
    async addCourseTag(req:Request,res: Response){
        try{
           const createTag = await articleTagService.insertCourseTag(req.body);
           if(createTag.status === resources.status.fail){
            return sendError.sendOtherError(res,500,createTag.message || resources.messages.error.unknown);
           }
           sendSuccess.sendSuccessResponse(res,200,createTag.data);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    }
}

