import resources from "../../utils/resources";
import dbModel from "../../config/db/modelCreation";
import { CourseAnswerDocument } from "../../model/Course/CourseChapterAnswer";

export default {
    async createAnswer (answerData : CourseAnswerDocument){
        try{
            const newAnswer = new dbModel.CourseAnswer({
            question_id : answerData.question_id,
            answer_title : answerData.answer_title,
            answer_description : answerData.answer_description,
            course_id : answerData.course_id,
            answerer_user_id : answerData.answerer_user_id
        });
        await newAnswer.save();
        return {
            status : resources.status.success,
            data : newAnswer,
            message : resources.messages.success.created
        }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getAnswerByAnswerID (answer_id : string) {
        try{
            const resultData = await dbModel.CourseAnswer.findOne({
                _id : answer_id
            });
            return {
                status: resources.status.success,
                data : resultData,
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getQuestionDataByQuestionID (question_id : string){
        try{
            const resultData = await dbModel.CourseQuestion.findOne({
                question_id : question_id
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
    async updateAnswer(answer_title: string,answer_description: string,answer_id: string){
        try{
            const updatedData = await dbModel.CourseAnswer.updateOne({
                answer_id : answer_id
            },{
                answer_title : answer_title,
                answer_description : answer_description
            });
            return {
                status: resources.status.success,
                data : { },
                message : resources.messages.success.updated
            }
        }catch(err){
            return {
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },

}