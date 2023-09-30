import { Request,Response } from "express";
import sendError from "../utils/sendError";
import sendSuccess from "../utils/sendSuccess";
import { checkServiceError ,serviceErrorWithMessage} from "../utils/catachServiceError";
import CourseReviewReply from "../services/CourseReviewReply";

export default {
    async insertReply (req:Request,res:Response){
        try{
            const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
            const userId = userData.user_id;
            
            const createReply = await CourseReviewReply.createReviewReply({
                ...req.body,
                replyer_user_id : userId,
            })
            await checkServiceError(createReply);

            sendSuccess.sendSuccessResponse(res,200,createReply.data|| { });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async editReply (req:Request,res:Response){
        try{
            const {review_reply_id,reply_description} = req.body;
            
            const editReply = await CourseReviewReply.editReviewReply(review_reply_id,reply_description);
            await checkServiceError(editReply);

            sendSuccess.sendSuccessResponse(res,200,{
                message : editReply.message
            });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getAllReplies (req:Request,res:Response){
        try{
            const {review_id,limit,page_no} = req.query;
            const currReviewID = review_id?.toString() || " ";
            const currPageNo = Number(page_no) || 1;
            const currLimit = Number(limit) || 3;

            const resultData = await CourseReviewReply.getAllReplies(currReviewID,currPageNo,currLimit);
            await checkServiceError(resultData);

            sendSuccess.sendSuccessResponsePagination(res,200,resultData.data || { },currPageNo,resultData.totalData || -1);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async deleteReply (req:Request,res:Response){
        try{
            const {review_reply_id} = req.body;
            
            const deleteReply = await CourseReviewReply.deleteReply(review_reply_id);
            await checkServiceError(deleteReply);

            sendSuccess.sendSuccessResponse(res,200,{
                message: deleteReply.message
            })
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },

}
