import {Request,Response}  from "express";
import sendError from "../../utils/sendError";
import sendSuccess from "../../utils/sendSuccess";
import { checkServiceError, serviceErrorWithMessage  } from "../../utils/catachServiceError";
import ArticleCommentService from "../../services/ArticleServices/ArticleCommentService";
import resources from "../../utils/resources";

export default {
    async addArticleComment (req:Request,res:Response){
        try{
            const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
            const userID = userData.user_id;
            const { article_id ,article_commenter_description} = req.body;

            const insertArticleComment = await ArticleCommentService.insertArticleComment(article_id,article_commenter_description,userID);
            await checkServiceError(insertArticleComment);

            sendSuccess.sendSuccessResponse(res,200,insertArticleComment.data);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async editArticleComment (req:Request,res:Response){
        try{
            const { article_commenter_description,article_comment_id } = req.body;

            const editArticleComment = await ArticleCommentService.editArticleComment(article_commenter_description,article_comment_id);
            await checkServiceError(editArticleComment);

            sendSuccess.sendSuccessResponse(res,200,{
                message : editArticleComment.message
            });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getAllComments (req:Request,res:Response){
        try{
            const {article_id,page_no,limit} = req.query;
            const currPageNo = Number(page_no) || 1;
            const currLimit = Number(limit) || 3;
            const currArticleID = article_id?.toString() || " ";
            const getAllComments = await ArticleCommentService.getAllCommentData(currArticleID,currPageNo,currLimit);
            await checkServiceError(getAllComments);

            sendSuccess.sendSuccessResponsePagination(res,200,getAllComments.data,currPageNo,getAllComments.totalData);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async addCommentReply (req:Request,res:Response){
        try{
            const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
            const userID = userData.user_id;
            const {article_comment_id,comment_reply_description} = req.body;
            
            const creatCommentReply = await ArticleCommentService.insertCommentReply(article_comment_id,comment_reply_description,userID);
            await checkServiceError(creatCommentReply);

            sendSuccess.sendSuccessResponse(res,200,creatCommentReply.data);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async deleteCommentReply (req:Request,res:Response) {
        try{
            const {comment_reply_id} = req.body;

            const deleteReply = await ArticleCommentService.deleteCommentReply(comment_reply_id);
            await checkServiceError(deleteReply);

            sendSuccess.sendSuccessResponse(res,200,{
                message : deleteReply.message
            })
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async editCommentReply (req:Request,res:Response){
        try{
            const {comment_reply_description,comment_reply_id} = req.body;

            const updateReply = await ArticleCommentService.editCommentReply(comment_reply_description,comment_reply_id);
            await checkServiceError(updateReply);

            sendSuccess.sendSuccessResponse(res,200,{
                message : updateReply.message
            })
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getAllCommentReplies (req:Request,res:Response){
        try{
            const {article_comment_id,page_no,limit} = req.query;

            const currCommentID = article_comment_id?.toString() || " ";


            const resData = await ArticleCommentService.getAllCommentReplies(currCommentID); 
            await checkServiceError(resData);

            sendSuccess.sendSuccessResponse(res,200,resData.data);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getFullCommentData (req:Request,res:Response){
        try{
            const {article_comment_id} =req.query;
            const currentArticleCommentID = article_comment_id?.toString() || " ";

            const commentData = await ArticleCommentService.getCommentData(currentArticleCommentID);
            await serviceErrorWithMessage(commentData.status,commentData.message || resources.messages.error.unknown);

            const replyData = await ArticleCommentService.getAllCommentReplies(currentArticleCommentID);
            await serviceErrorWithMessage(replyData.status,replyData.message || resources.messages.error.unknown);

            const resultData = {
                commentData : commentData.data,
                replyData : replyData.data
            }
            sendSuccess.sendSuccessResponse(res,200,resultData);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async deleteComment (req:Request,res:Response){
        try{
            const {article_comment_id} = req.body;
            
            const deleteComment = await ArticleCommentService.deleteComment(article_comment_id);
            await checkServiceError(deleteComment);

            const deleteCommentReplies = await ArticleCommentService.deleteCommentReplies(article_comment_id);
            await checkServiceError(deleteCommentReplies);

            sendSuccess.sendSuccessResponse(res,200,{
                message : resources.messages.success.deleted
            });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    }
}