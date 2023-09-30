import { model, Model } from "mongoose";
import {UserDocument,userSchema} from '../../model/User'
import {EducatorDocument,educatorSchema} from '../../model/Educator';
import {courseSchema,CourseDocument} from '../../model/Course/Course';
import {subtitleSchema,SubtitleDocument} from '../../model/subtitle';
import {courseDescriptionSchema,CourseDescriptionDocument} from '../../model/Course/CourseDescription';
import {CourseModuleDocument,CourseModuleSchema} from "../../model/Course/CourseModule";
import {CourseChapterDocument,CourseChapterSchema,chapterSubtitleDocumet,chapterSubtitleSchema} from "../../model/Course/CourseChapter";
import {CourseReviewReplyDocument,CourseReviewReplySchema} from "../../model/Course/CourseReviewReply";
import {CourseQuestionDocument,CourseQuestionSchema} from "../../model/Course/CourseChapterQuestion";
import {CourseAnswerDocument,CourseAnswerSchema} from "../../model/Course/CourseChapterAnswer";
const dbModel: {
    Users: Model<UserDocument>,
    Educator: Model<EducatorDocument>,
    Course : Model<CourseDocument>,
    Subtitle : Model<SubtitleDocument>,
    CourseDescription : Model<CourseDescriptionDocument>
    CourseModule : Model<CourseModuleDocument>,
    CourseChapter : Model<CourseChapterDocument>,
    ChapterSubtitle : Model<chapterSubtitleDocumet>,
    CourseReviewReply : Model<CourseReviewReplyDocument>,
    CourseQuestion : Model<CourseQuestionDocument>,
    CourseAnswer : Model<CourseAnswerDocument>
  } = {
    Users: model<UserDocument>("User", userSchema),
    Educator: model<EducatorDocument>("Educator",educatorSchema),
    Course : model<CourseDocument>("Course",courseSchema),
    Subtitle : model<SubtitleDocument>('Subtitle',subtitleSchema),
    CourseDescription : model<CourseDescriptionDocument>('CourseDescription',courseDescriptionSchema),
    CourseModule : model<CourseModuleDocument>('CourseModule',CourseModuleSchema),
    CourseChapter : model<CourseChapterDocument>('CourseChapter',CourseChapterSchema),
    ChapterSubtitle : model<chapterSubtitleDocumet>('ChapterSubtitle',chapterSubtitleSchema),
    CourseReviewReply : model<CourseReviewReplyDocument>('CourseReviewReply',CourseReviewReplySchema),
    CourseQuestion : model<CourseQuestionDocument>('CourseQuestion',CourseQuestionSchema),
    CourseAnswer : model<CourseAnswerDocument>('CourseAnswer',CourseAnswerSchema)
  };
export default dbModel;