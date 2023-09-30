import resources from "../../utils/resources";
import dbModel from "../../config/db/modelCreation";
import { articleDocument } from "../../model/article/Article";

export default {
    async insertArticle (articleData : articleDocument){
        try{
            const newArticle = new dbModel.Article({
                article_title : articleData.article_title,
                article_description : articleData.article_description,
                author_user_id : articleData.author_user_id,
                article_tag_list : articleData.article_tag_list,
                article_skill_list : articleData.article_skill_list,
                article_picture_path : articleData.article_picture_path
            });
            await newArticle.save();
            return {
                status : resources.status.success,
                data : newArticle
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getAllArticles(pageNumber : number, limitNumber : number) {
        try{   
            const articleDataPipeline = [
                {
                    $lookup: {
                        from: "articlelikes",
                        localField: "article_id",
                        foreignField: "article_id",
                        as: "likes"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        article_title: 1,
                        article_description: 1,
                        author_user_id: 1,
                        article_id: 1,
                        created_at: 1,
                        ArticleLikeCount: { $size: "$likes" } 
                    }
                },
                {
                    $skip: (pageNumber - 1) * limitNumber
                },
                {
                    $limit: limitNumber
                }
            ];
    
            const resultData = await dbModel.Article.aggregate(articleDataPipeline);    
            const totalData = await dbModel.Article.countDocuments();
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
    async createLike (article_id:string,user_id :string){
        try{
            const newLike = new dbModel.ArticleLike({
                article_id : article_id,
                liker_user_id : user_id,
            });
            await newLike.save();

            return {
                status : resources.status.success,
                data : newLike
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async deleteLike (article_id:string,user_id :string){
        try{
            const deleteLike = await dbModel.ArticleLike.deleteOne({
                article_id : article_id,
                liker_user_id : user_id
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
    async searchAritcleForKeyword (pageNumber : number, limitNumber : number,keyword:string){
        try{
            const resultData = await dbModel.Article.find({
                $or : [
                    { article_title: { $regex: keyword, $options: "i" } },
                    { article_description: { $regex: keyword, $options: "i" } }
                ]
            },{
                _id : 0,
                article_id : 1,
                article_title : 1,
                article_description : 1
            }).skip( (pageNumber - 1) * limitNumber).limit(limitNumber);
            const totalData = await dbModel.Article.countDocuments({
                $or : [
                    { article_title: { $regex: keyword, $options: "i" } },
                    { article_description: { $regex: keyword, $options: "i" } }
                ]
            })
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
    async isArticlePresent (article_id:string){
        try{
            const resultData = await dbModel.Article.exists({
                article_id : article_id
            });
            return {
                status : resources.status.success,
                message : resources.messages.success.fetched,
                presentFlag : resultData
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getArticleDataCommentLikes (article_id:string,articleCommentLimit : number){
        try{
            const articleDataPipeline = [
                {
                    $match: { article_id } 
                },
                {
                    $lookup: {
                        from: "articlelikes",
                        localField: "article_id",
                        foreignField: "article_id",
                        as: "likes"
                    }
                },
                {
                    $lookup: {
                        from: "articlecomments",
                        localField: "article_id",
                        foreignField: "article_id",
                        as: "articleComments"
                    }
                },
                {
                    $lookup: {
                        from: "users", 
                        localField: "articleComments.article_commenter_user_id",
                        foreignField: "user_id", 
                        as: "commenterUserData"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        article_title: 1,
                        article_description: 1,
                        author_user_id: 1,
                        article_id: 1,
                        created_at: 1,
                        ArticleLikeCount: { $size: "$likes" },
                        articleComments: {
                            $map: {
                                input: "$articleComments",
                                as: "comment",
                                in: {
                                    article_id: "$$comment.article_id",
                                    article_commenter_user_id: "$$comment.article_commenter_user_id",
                                    article_commenter_description: "$$comment.article_commenter_description",
                                    article_comment_id: "$$comment.article_comment_id",
                                    first_name: { $arrayElemAt: ["$commenterUserData.first_name", 0] },
                                    last_name: { $arrayElemAt: ["$commenterUserData.last_name", 0] },
                                    user_id: { $arrayElemAt: ["$commenterUserData.user_id", 0] },
                                    profile_picture_path: { $arrayElemAt: ["$commenterUserData.profile_picture_path", 0] },
                                }
                            }
                        }
                    }
                },

                {
                    $limit: articleCommentLimit
                }
            ]
            const resultData = await dbModel.Article.aggregate(articleDataPipeline); 
            return {
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
    async getArticleData (article_id:string){
        try{
            const resultData = await dbModel.Article.findOne({
                article_id : article_id
            });
            return {
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
    async deleteArticleByArticleID (article_id:string) {
        try{
            const deleteData = await dbModel.Article.deleteOne({
                article_id : article_id
            });
            return {
                status: resources.status.success,
                message: resources.messages.success.deleted
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    }
}