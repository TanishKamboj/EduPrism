import { Request,Response,NextFunction } from "express";
import { checkServiceError, serviceErrorWithMessage } from "../utils/catachServiceError";
import sendError from "../utils/sendError";
import ArticleService from "../services/ArticleServices/ArticleService";
import resources from "../utils/resources";
import ArticleCommentService from "../services/ArticleServices/ArticleCommentService";

const isArticlePresent = async (req:Request,res:Response,next:NextFunction) =>{
    try{
        const {article_id} = req.body;
        const isArticlePresent = await ArticleService.isArticlePresent(article_id);
        await serviceErrorWithMessage(isArticlePresent.status,isArticlePresent.message);
        const articleStatus = isArticlePresent.presentFlag;
        if(articleStatus === null){
            sendError.sendOtherError(res,400,resources.messages.error.notFound);
        }
        next();
    }catch(err){
        sendError.sendServerError(res,err as Error,500);
    }
}
const isUserCommenter = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
        const userID = userData.user_id;
        const {article_comment_id } = req.body;

        const articleData = await ArticleCommentService.getCommentData(article_comment_id);
        await serviceErrorWithMessage(articleData.status,articleData.message || resources.messages.error.unknown);
        
        if(articleData.data?.article_commenter_user_id !== userID){
            sendError.sendOtherError(res,400,resources.messages.error.unauthorized);
        }
        next();
    }catch(err){
        sendError.sendServerError(res,err as Error,500);
    }
}
export { isArticlePresent,isUserCommenter}