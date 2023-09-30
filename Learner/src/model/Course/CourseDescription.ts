import { Document,Schema } from "mongoose";

interface CourseDescriptionDocument extends Document{
    course_description_id : string,
    course_id : string,
    course_requirements : string,
    course_taget_audience : string,
    created_at : Date,
    updated_at : Date
}
const courseDescriptionSchema = new Schema<CourseDescriptionDocument>({
    course_description_id : {type: String},
    course_id : {type: String},
    course_requirements : {type: String},
    course_taget_audience : {type: String},
    created_at : Date,
    updated_at : Date,
})
courseDescriptionSchema.pre<CourseDescriptionDocument>("save", function (next) {
    this.course_description_id = this._id;
    this.created_at = new Date();
    this.updated_at = new Date();
    next();
});

export {CourseDescriptionDocument,courseDescriptionSchema};