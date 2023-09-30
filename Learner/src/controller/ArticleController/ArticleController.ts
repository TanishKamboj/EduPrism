import {Request,Response}  from "express";
import sendError from "../../utils/sendError";
import sendSuccess from "../../utils/sendSuccess";
import { checkServiceError, serviceErrorWithMessage  } from "../../utils/catachServiceError";
import ArticleService from "../../services/ArticleServices/ArticleService";
import resources from "../../utils/resources";
import ArticleCommentService from "../../services/ArticleServices/ArticleCommentService";

export default {
    async createArticle (req:Request,res:Response){
        try{
            const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
            const userID = userData.user_id;
            const articlePath = req.file?.path;
            const createArticle = await ArticleService.insertArticle({
                ...req.body,
                author_user_id: userID,
                article_picture_path : articlePath
            });
            await checkServiceError(createArticle);

            sendSuccess.sendSuccessResponse(res,200,createArticle.data);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async deleteArticle (req:Request,res:Response){
        try{
            const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
            const userID = userData.user_id;
            const {article_id} = req.body;

            const getAricleData = await ArticleService.getArticleData(article_id);
            await serviceErrorWithMessage(getAricleData.status,getAricleData.message || resources.messages.error.unknown);

            if(getAricleData.data?.author_user_id !== userID){
                sendError.sendOtherError(res,400,resources.messages.error.unauthorized);
            }
            
            const articleCommentID = await ArticleCommentService.getAllCommentIDByArticleID(article_id); 
            await checkServiceError(articleCommentID);
        
            const commentIdList = articleCommentID.data?.map(obj => obj.article_comment_id) || [" "];
            
            const deleteComments = await ArticleCommentService.deleteCommentByArticleID(article_id);
            await checkServiceError(deleteComments);

            const deleteCommentReplies = await ArticleCommentService.deleteRepliesByMultipleComments(commentIdList);
            await checkServiceError(deleteCommentReplies);

            const deleteArticle = await ArticleService.deleteArticleByArticleID(article_id);
            await checkServiceError(deleteArticle);
            sendSuccess.sendSuccessResponse(res,200,{
                message : resources.messages.success.deleted
            })
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getAllArticles(req:Request,res:Response){
        try{
            const {page_no,limit} = req.query;
            const currPageNo = Number(page_no) || 1;
            const currLimit = Number(limit) || 3;
            
            const articleData = await ArticleService.getAllArticles(currPageNo,currLimit);
            await checkServiceError(articleData);

            sendSuccess.sendSuccessResponsePagination(res,200,articleData.data || { },currPageNo,articleData.totalData);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async searchKeywordInArticle (req:Request,res:Response){
        try{
            const {keyword,page_no,limit} = req.query;
            const currKeyword = keyword?.toString() || " ";
            const currPageNo = Number(page_no) || 1;
            const currLimit = Number(limit) || 3;
            const keywordData = await ArticleService.searchAritcleForKeyword(currPageNo,currLimit,currKeyword);
            await checkServiceError(keywordData);
            
            sendSuccess.sendSuccessResponsePagination(res,200,keywordData.data || { },currPageNo,keywordData.totalData);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async likeArticle (req:Request,res:Response){
        try{
            const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
            const userID = userData.user_id;
            const {article_id} = req.body;
            const createArticleLike = await ArticleService.createLike(article_id,userID);
            await checkServiceError(createArticleLike);

            sendSuccess.sendSuccessResponse(res,200,createArticleLike.data);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async unlikeArticle (req:Request,res:Response){
        try{
            const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
            const userID = userData.user_id;
            const {article_id} = req.body;
            const createArticleLike = await ArticleService.deleteLike(article_id,userID);
            await checkServiceError(createArticleLike);

            sendSuccess.sendSuccessResponse(res,200,{
                message : createArticleLike.message
            });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getFullArticleData(req:Request,res:Response){
        try{
            const {article_id} = req.query;
            const currArticleID = article_id?.toString() || " ";
            const articleCommentLimit = 3;
            const articleData = await ArticleService.getArticleDataCommentLikes(currArticleID,articleCommentLimit);
            await serviceErrorWithMessage(articleData.status,articleData.message || resources.messages.error.unknown);

            sendSuccess.sendSuccessResponse(res,200,articleData.data);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
}