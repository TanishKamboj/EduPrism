import resources from "../utils/resources";
import dbModel from "../config/db/modelCreation";
import { CourseReviewReplyDocument } from "../model/Course/CourseReviewReply";

export default {
    async createReviewReply(replyData : CourseReviewReplyDocument){
        try{
            const insertReply = new dbModel.CourseReviewReply({
                review_id : replyData.review_id,
                replyer_user_id : replyData.replyer_user_id,
                reply_description : replyData.reply_description,
            });
            await insertReply.save();
            return{
                status : resources.status.success,
                data : insertReply
            }
        }catch(err){
            return {
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },   
    async editReviewReply (review_reply_id : string,reply_description:string){
        try{
            const updateReply = await dbModel.CourseReviewReply.updateOne({
                review_reply_id : review_reply_id
            },{
                reply_description : reply_description,
                updated_at : new Date()
            });
            return {
                status : resources.status.success,
                data : updateReply,
                message : resources.messages.success.updated
            }
        }catch(err){
            return {
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getAllReplies(review_id : string,pageNumber : number,limitNumber : number){
        try{
            const resultData = await dbModel.CourseReviewReply.find({
                review_id : review_id
            },{
                _id : 0,
                review_id : 1,
                replyer_user_id : 1,
                reply_description : 1,
                review_reply_id : 1,
                created_at : 1,
                updated_at : 1
            }).sort({ updated_at: 1 })
            .skip((pageNumber - 1)*limitNumber)
            .limit(limitNumber);
            const totalData = await dbModel.CourseReviewReply.countDocuments({
                review_id : review_id
            })
            return {
                status : resources.status.success,
                data : resultData,
                totalData : totalData
            }
        }catch(err){
            return {
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async deleteReply (review_reply_id : string){
        try{
            const resultData = await dbModel.CourseReviewReply.deleteOne({
                review_reply_id : review_reply_id
            });
            return {
                status: resources.status.success,
                data : resultData,
                message : resources.messages.success.deleted
            }
        }catch(err){
            return {
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    } 
}