import resources from "../utils/resources";
import dbModel from "../config/db/modelCreation";
import {CourseReviewDocument} from "../model/Course/CourseReview";
export default {
    async insertReview(reviewData : CourseReviewDocument){
        try{
            const newReview = new dbModel.CourseReview({
                course_id : reviewData.course_id,
                course_rating : reviewData.course_rating,
                review_description : reviewData.review_description,
                reviewer_user_id : reviewData.reviewer_user_id
            });
            await newReview.save();
            return{
                status: resources.status.success,
                message : resources.messages.success.created
            }
        }catch(err){
            return {
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async deleteReview(course_review_id : string) {
        try{
            const resultData = await dbModel.CourseReview.deleteOne({
                course_review_id : course_review_id
            });
            return {
                status: resources.status.success,
                data : resultData ,
                message: resources.messages.success.deleted
            }
        }catch(err){
            return {
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            } 
        }
    },
    async editReview (reviewData : CourseReviewDocument,course_review_id: string){
        try{
            const resultData = await dbModel.CourseReview.updateOne({
                _id : course_review_id
            },{
                review_description : reviewData.review_description,
                course_rating : reviewData.course_rating,
                updated_at : new Date()
            });
            return {
                status: resources.status.success,
                data : resultData,
                message : resources.messages.success.updated
            }
        }catch(err){
            return {
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            } 
        }
    },
    async getReviewByReviewID (course_review_id : string){
        try{
            const resultData = await dbModel.CourseReview.findOne({
                course_review_id : course_review_id
            },{
                _id : 0,
                course_id : 1,
                review_description : 1,
                reviewer_user_id : 1,
                course_rating : 1,
                created_at : 1,
                updated_at: 1,
                course_review_id : 1,
                featured_review : 1
            });
            return {
                status : resources.status.success,
                data : resultData
            }
        }catch(err){
            return {
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            } 
        }
    },
    async getALlCourserReview (course_id : string,limitNumber :number,pageNumber : number){
        try{
            const resultData = await dbModel.CourseReview.find({
                course_id : course_id
            },{
                _id : 0,
                course_id : 1,
                review_description : 1,
                reviewer_user_id : 1,
                course_rating : 1,
                created_at : 1,
                updated_at: 1,
                course_review_id : 1,
                featured_review : 1
            }).skip((pageNumber - 1)*limitNumber).limit(limitNumber)
            return {
                status : resources.status.success,
                data : resultData,

            }
        }catch(err){
            return {
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            } 
        }
    },
}