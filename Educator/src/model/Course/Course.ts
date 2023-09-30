import { Document,Schema } from "mongoose";

interface subtitleData {
    subtitle_id : number,
    subtitle_path : string
}
interface CourseDocument extends Document{
    course_id : string,
    course_title : string,
    course_short_description : string,
    instructor_user_id_list : string[],
    TA_user_id_list : string[],
    content_maker_user_id_list : string[],
    course_review_id_list : number[],
    course_subtitle_id_list : number[],
    course_skill_id : number,
    course_industry_type_id : number,
    course_trailer_path : string,
    course_price_amount : number,
    currency_id : number,
    course_tag_id_list : number[],
    course_admin_id_list : string [],
    course_thumbnail_path : string,
    subtitle_data : subtitleData[],
    created_at : Date,
    updated_at : Date
}
const subtitleDataSchema = new Schema<subtitleData>({
    subtitle_id: { type: Number },
    subtitle_path: { type: String },
  });
const courseSchema = new Schema<CourseDocument>({
    course_id : {type: String},
    course_title : {type: String},
    course_short_description : {type: String},
    instructor_user_id_list : {type: [String]},
    TA_user_id_list : {type: [String]},
    content_maker_user_id_list : {type: [String]},
    course_review_id_list : {type : [Number]},
    course_subtitle_id_list : {type : [Number]},
    course_skill_id : {type : Number},
    course_industry_type_id : {type : Number},
    course_trailer_path : {type: String},
    course_price_amount : {type : Number},
    currency_id : {type : Number},
    course_tag_id_list : {type : [Number]},
    course_admin_id_list : {type: [String]},
    course_thumbnail_path : {type: String},
    subtitle_data : {type: [subtitleDataSchema]},
    created_at : {type: Date},
    updated_at : {type :Date},
})

courseSchema.pre<CourseDocument>("save", function (next) {
    this.course_id = this._id;
    this.created_at = new Date(),
    this.updated_at = new Date(),
    next();
});

export {CourseDocument,courseSchema};