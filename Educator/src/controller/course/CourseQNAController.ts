import { Request,Response } from "express";
import sendSuccess from "../../utils/sendSuccess";
import sendError from "../../utils/sendError";
import CourseQNAService from "../../services/Course/CourseQNAService";
import { checkServiceError, serviceErrorWithMessage } from "../../utils/catachServiceError";
import resources from "../../utils/resources";
import UserServices from "../../services/UserServices";

export default {
    async addAnswer(req:Request,res:Response){
        try{
            const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
            const user_id = userData.user_id;
            
            const createAnswer = await CourseQNAService.createAnswer({
                ...req.body,
                answerer_user_id : user_id
            });
            await checkServiceError(createAnswer);

            sendSuccess.sendSuccessResponse(res,200,{
                message : createAnswer.message,
            })
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async editAnswer(req:Request,res:Response){
        try{
            const {answer_title,answer_description,answer_id} =req.body;
            
            const updateAnswer = await CourseQNAService.updateAnswer(answer_title,answer_description,answer_id);
            await checkServiceError(updateAnswer);
            
            sendSuccess.sendSuccessResponse(res,200,{
                message : updateAnswer.message
            })
        }catch(err){
            sendError.sendServerError(res,err as Error,500)
        }
    },
}