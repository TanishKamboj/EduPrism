import { Document,Schema } from "mongoose";

interface CourseAnswerDocument extends Document{
    answer_id : string,
    question_id : string,
    course_id : string,
    answer_title : string,
    answer_description : string,
    answerer_user_id : string,
    created_at : Date,
    updated_at : Date
}
const CourseAnswerSchema = new Schema<CourseAnswerDocument>({
    answer_id : {type : String},
    question_id : {type : String},
    course_id : {type : String},
    answer_title : {type : String},
    answer_description : {type : String},
    answerer_user_id : {type : String},
    created_at :  {type : Date},
    updated_at : {type : Date},
})
CourseAnswerSchema.pre<CourseAnswerDocument>("save", function (next) {
    this.answer_id = this._id;
    this.created_at = new Date();
    this.updated_at = new Date();
    next();
});

export {CourseAnswerDocument,CourseAnswerSchema};