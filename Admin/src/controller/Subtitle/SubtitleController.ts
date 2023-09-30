import { Request,Response } from "express";
import sendError from "../../utils/sendError"; 
import sendSuccess from "../../utils/sendSuccess";
import subtitleService from "../../services/subtitleService";
import { checkServiceError } from "../../utils/catachServiceError";
export default {
    async addSubtitle(req:Request,res:Response){
        try{
            const subtitleData = req.body;
            const resultData = await subtitleService.insertSubtitle(subtitleData);
            await checkServiceError(resultData);
            sendSuccess.sendSuccessResponse(res,200,resultData.data || { });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    }
}