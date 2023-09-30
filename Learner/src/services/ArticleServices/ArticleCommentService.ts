import resources from "../../utils/resources";
import dbModel from "../../config/db/modelCreation";

export default {
    async insertArticleComment(article_id:string,article_commenter_description: string,user_id : string){
        try{
            const newComment = new dbModel.ArticleComment({
                article_id : article_id,
                article_commenter_description : article_commenter_description,
                article_commenter_user_id : user_id
            });
            await newComment.save();
            return{
                status : resources.status.success,
                data : newComment
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async editArticleComment (article_commenter_description:string, article_comment_id:string){
        try{
            const editComment = await dbModel.ArticleComment.updateOne({
                article_comment_id : article_comment_id
            },{
                article_commenter_description : article_commenter_description,
                updated_at : new Date()
            });
            return {
                status: resources.status.success,
                message : resources.messages.success.updated
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getCommentData (article_comment_id:string) {
        try{
            const resultData = await dbModel.ArticleComment.findOne({
                article_comment_id : article_comment_id
            });
            return{
                status: resources.status.success,
                data : resultData
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getAllCommentData (article_id:string, pageNumber : number, limitNumber : number){
        try{
            const resultData = await dbModel.ArticleComment.find({
                article_id : article_id
            },{
                _id : 0,
                article_comment_id : 1,
                article_commenter_description : 1,
            }).skip( (pageNumber - 1) * limitNumber).limit(limitNumber);
            const totalData = await dbModel.ArticleComment.countDocuments({
                article_id : article_id
            });
            return {
                status: resources.status.success,
                data : resultData,
                totalData : totalData
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async insertCommentReply (article_comment_id : string,comment_reply_description: string,user_id:string){
        try{
            const newInsert = new dbModel.ArticleCommentReply({
                article_comment_id : article_comment_id,
                comment_reply_description : comment_reply_description,
                replier_user_id : user_id
            });
            await newInsert.save();
            return{
                status : resources.status.success,
                data : newInsert,
                message : resources.messages.success.created
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async deleteCommentReply (comment_reply_id : string){
        try{
            const deleteReply = await dbModel.ArticleCommentReply.deleteOne({
                _id : comment_reply_id
            });
            return {
                status : resources.status.success,
                message : resources.messages.success.deleted
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async editCommentReply (comment_reply_description:string,comment_reply_id:string) {
        try{
            const editCommentReply = await dbModel.ArticleCommentReply.updateOne({
                comment_reply_id : comment_reply_id
            },{
                comment_reply_description : comment_reply_description
            });
            return {
                status : resources.status.success,
                message : resources.messages.success.updated
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getAllCommentReplies (article_comment_id : string) {
        try{
            const replyPipeline = [
                    {
                        $lookup: {
                            from: "users", 
                            localField: "replier_user_id",
                            foreignField: "user_id",
                            as: "userData"
                        },
                    },
                    {
                        $project: {
                            _id : 0,
                            comment_reply_description : 1,
                            article_comment_id : 1,
                            comment_reply_id : 1,
                            created_at : 1,
                            userData : {
                                first_name: { $arrayElemAt: ["$userData.first_name", 0] },
                                last_name: { $arrayElemAt: ["$userData.last_name", 0] },
                                user_id: { $arrayElemAt: ["$userData.user_id", 0] },
                                profile_picture_path: { $arrayElemAt: ["$userData.profile_picture_path", 0] },
                            }
                        }
                    },
            ];
            const resultData = await dbModel.ArticleCommentReply.aggregate(replyPipeline).sort({
                created_at: -1
            }).exec();
            const totalData = await dbModel.ArticleCommentReply.countDocuments({
                article_comment_id : article_comment_id
            }) 

            return {
                status : resources.status.success,
                data : resultData,
                totalData : totalData
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async deleteComment (article_comment_id : string){
        try{
            const deleteComment = await dbModel.ArticleComment.deleteOne({
                article_comment_id : article_comment_id
            });
            return {
                status : resources.status.success,
                message : resources.messages.success.deleted
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async deleteCommentReplies (article_comment_id:string){
        try{
            const deleteData = await dbModel.ArticleCommentReply.deleteMany({
                article_comment_id : article_comment_id 
            });
            return {
                status: resources.status.success,
                message : resources.messages.success.deleted
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getAllCommentIDByArticleID (article_id:string){
        try{
            const resultData = await dbModel.ArticleComment.find({
                article_id : article_id
            },{
                _id : 0,
                article_comment_id : 1
            });
            return{
                status: resources.status.success,
                data : resultData
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async deleteCommentByArticleID(article_id:string){
        try{
            const resultData = await dbModel.ArticleComment.deleteMany({
                article_id : article_id
            });
            return {
                status: resources.status.success,
                message : resources.messages.success.deleted
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async deleteRepliesByMultipleComments(articleCommenIDList: string[]){
        try{
            const deleteReplies = await dbModel.ArticleCommentReply.deleteMany({
                article_comment_id :  {$in : articleCommenIDList}
            });
            return {
                status: resources.status.success,
                message : resources.messages.success.deleted
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    }
}