import { Document,Schema } from "mongoose";

interface CourseQuestionDocument extends Document{
    question_id : string,
    course_id : string,
    course_chapter_id : string,
    question_title : string,
    question_description : string,
    questionnaire_user_id : string,
    created_at : Date,
    updated_at : Date
}
const CourseQuestionSchema = new Schema<CourseQuestionDocument>({
    question_id : {type : String},
    course_id :  {type : String},
    course_chapter_id :  {type : String},
    question_title :  {type : String},
    question_description :  {type : String},
    questionnaire_user_id :  {type : String},
    created_at :  {type : Date},
    updated_at : {type : Date},
})
CourseQuestionSchema.pre<CourseQuestionDocument>("save", function (next) {
    this.question_id = this._id;
    this.created_at = new Date();
    this.updated_at = new Date();
    next();
});

export {CourseQuestionDocument,CourseQuestionSchema};