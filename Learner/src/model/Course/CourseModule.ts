import { Document,Schema } from "mongoose";

interface CourseModuleDocument extends Document{
    course_module_id : string,
    course_id : string,
    module_number : number,
    module_title : string,
    module_description : string,
    created_at : Date,
    updated_at : Date
}
const CourseModuleSchema = new Schema<CourseModuleDocument>({
    course_module_id : {type: String},
    course_id : {type: String},
    module_number : {type: Number},
    module_title : {type: String},
    module_description : {type: String},
    created_at : {type: Date},
    updated_at : {type: Date}
})
CourseModuleSchema.pre<CourseModuleDocument>("save", function (next) {
    this.course_module_id = this._id;
    this.created_at = new Date();
    this.updated_at = new Date();
    next();
});

export {CourseModuleDocument,CourseModuleSchema};