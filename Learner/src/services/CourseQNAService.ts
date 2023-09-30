import resources from "../utils/resources";
import dbModel from "../config/db/modelCreation";
import { CourseQuestionDocument } from "../model/Course/CourseChapterQuestion"; 
import { CourseAnswerDocument } from "../model/Course/CourseChapterAnswer";
export default {
    async insertQuestion (questionData : CourseQuestionDocument){
        try{
            const newQuestion = new dbModel.CourseQuestion({
                course_id : questionData.course_id,
                course_chapter_id : questionData.course_chapter_id,
                question_title : questionData.question_title,
                question_description : questionData.question_description,
                questionnaire_user_id : questionData.questionnaire_user_id
            });
            await newQuestion.save();
            return{
                status : resources.status.success,
                data : newQuestion  
            }
        }catch(err){
            return{
                status : resources.status.fail,
                message: resources.messages.error.generic(err as Error)
            }
        }
    },
    async editQuestion (question_id :string,question_title:string,question_description:string){
        try{
            const editQuestion = await dbModel.CourseQuestion.updateOne({
                question_id : question_id
            },{
                question_title : question_title,
                question_description : question_description,
                updated_at : new Date()
            });
            return {
                status : resources.status.success,
                data : editQuestion,
                message : resources.messages.success.updated
            }
        }catch(err){
            return{
                status : resources.status.fail,
                message: resources.messages.error.generic(err as Error)
            }
        }
    },
    async getChapterQuestion (course_chapter_id : string,pageNumber : number,limitNumber : number){
        try{
            const resultData = await dbModel.CourseQuestion.find({
                course_chapter_id : course_chapter_id 
            },{
                _id : 0,
                questionnaire_user_id : 1,
                question_id : 1,
                question_title : 1,
                question_description : 1,
                created_at : 1,
                updated_at : 1
            }).skip((pageNumber - 1)*limitNumber).limit(limitNumber);
            const totalData = await dbModel.CourseQuestion.countDocuments({
                course_chapter_id : course_chapter_id 
            })
            return {
                status: resources.status.success,
                data : resultData,
                totalData : totalData
            }
        }catch(err){
            return{
                status : resources.status.fail,
                message: resources.messages.error.generic(err as Error)
            }
        }
    },
    async getQuestionWithQuestionID (question_id : string) {
        try{
            const resultData = await dbModel.CourseQuestion.findOne({
                question_id : question_id
            },{
                _id : 0,
                course_id : 1,
                course_chapter_id : 1,
                question_title : 1,
                question_description: 1,
                question_id : 1,
                questionnaire_user_id : 1,
                created_at : 1,
                updated_at : 1
            });
            return {
                status : resources.status.success,
                data : resultData
            }
        }catch(err){
            return{
                status : resources.status.fail,
                message: resources.messages.error.generic(err as Error)
            }
        }
    },
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
    async getAllAnswersData (question_id : string) {
        try{
            const resultData = await dbModel.CourseAnswer.find({
                question_id : question_id
            },{
                _id : 0,
                answer_title : 1,
                answerer_user_id : 1,
                answer_id : 1,
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
    }
}