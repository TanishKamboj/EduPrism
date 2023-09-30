import { Document,Schema } from "mongoose";

interface chapterSubtitleDocumet extends Document {
    subtitle_id : number,
    subtitle_path : string,
    chapter_subtitle_id : string
}
const chapterSubtitleSchema = new Schema<chapterSubtitleDocumet>({
    subtitle_id: { type: Number },
    subtitle_path: { type: String },
    chapter_subtitle_id : { type: String }
});
chapterSubtitleSchema.pre<chapterSubtitleDocumet>("save", function (next) {
    this.chapter_subtitle_id = this._id;
    next();
});
interface CourseChapterDocument extends Document{
    module_chapter_id : string,
    chapter_number : number,
    course_module_id : string,
    chapter_title : string,
    chapter_description : string,
    chapter_resources : string,
    video_path : string,
    video_duration : string,
    preview_chapter : boolean,
    chapter_subtitle : chapterSubtitleDocumet[],
    created_at : Date,
    updated_at : Date
}
const CourseChapterSchema = new Schema<CourseChapterDocument>({
    module_chapter_id : {type: String},
    chapter_number : {type :Number},
    course_module_id : {type: String},
    chapter_title : {type: String},
    chapter_description : {type: String},
    chapter_resources : {type: String},
    video_path : {type: String},
    video_duration : {type: String},
    preview_chapter : {type : Boolean, default : false},
    chapter_subtitle : {type: [chapterSubtitleSchema]},
    created_at : {type: Date},
    updated_at : {type: Date}
})
CourseChapterSchema.pre<CourseChapterDocument>("save", function (next) {
    this.created_at = new Date();
    this.updated_at = new Date();
    this.module_chapter_id = this._id;
    next();
});

export {CourseChapterDocument,CourseChapterSchema,chapterSubtitleDocumet,chapterSubtitleSchema};