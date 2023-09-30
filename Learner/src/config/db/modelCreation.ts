import { Model,model } from 'mongoose';
import {userSchema,UserDocument} from '../../model/User';
import {courseSchema,CourseDocument} from '../../model/Course/Course';
import {courseDescriptionSchema,CourseDescriptionDocument} from '../../model/Course/CourseDescription';
import {CourseModuleDocument,CourseModuleSchema} from "../../model/Course/CourseModule";
import {CourseChapterDocument,CourseChapterSchema,chapterSubtitleDocumet,chapterSubtitleSchema} from "../../model/Course/CourseChapter";
import {OrderDocument,OrderSchema} from "../../model/Order";
import {CourseReviewDocument,CourseReviewSchema} from "../../model/Course/CourseReview";
import {CourseReviewReplyDocument,CourseReviewReplySchema} from "../../model/Course/CourseReviewReply";
import {CourseQuestionDocument,CourseQuestionSchema} from "../../model/Course/CourseChapterQuestion";
import {CourseAnswerDocument,CourseAnswerSchema} from "../../model/Course/CourseChapterAnswer";
import { articleDocument,articleSchema } from '../../model/article/Article';
import { articleLikeDocument,articleLikeSchema } from '../../model/article/ArticleLike';
import { articleCommentDocument,articleCommentSchema } from '../../model/article/ArticleComment';
import { commentReplyDocument,commentReplySchema } from '../../model/article/ArticleCommentReply';
const dbModel: {
    Users: Model<UserDocument>,
    Course : Model<CourseDocument>,
    CourseDescription : Model<CourseDescriptionDocument>
    CourseModule : Model<CourseModuleDocument>,
    CourseChapter : Model<CourseChapterDocument>,
    ChapterSubtitle : Model<chapterSubtitleDocumet>,
    Order : Model<OrderDocument>,
    CourseReview : Model<CourseReviewDocument>,
    CourseReviewReply : Model<CourseReviewReplyDocument>,
    CourseQuestion : Model<CourseQuestionDocument>,
    CourseAnswer : Model<CourseAnswerDocument>,
    Article : Model<articleDocument>,
    ArticleLike : Model<articleLikeDocument>,
    ArticleComment : Model<articleCommentDocument>,
    ArticleCommentReply : Model<commentReplyDocument>,
  } = {
    Users: model<UserDocument>("User", userSchema),
    Course : model<CourseDocument>("Course",courseSchema),
    CourseDescription : model<CourseDescriptionDocument>('CourseDescription',courseDescriptionSchema),
    CourseModule : model<CourseModuleDocument>('CourseModule',CourseModuleSchema),
    CourseChapter : model<CourseChapterDocument>('CourseChapter',CourseChapterSchema),
    ChapterSubtitle : model<chapterSubtitleDocumet>('ChapterSubtitle',chapterSubtitleSchema),
    Order : model<OrderDocument>('Order',OrderSchema),
    CourseReview : model<CourseReviewDocument>('CourseReview',CourseReviewSchema),
    CourseReviewReply : model<CourseReviewReplyDocument>('CourseReviewReply',CourseReviewReplySchema),
    CourseQuestion : model<CourseQuestionDocument>('CourseQuestion',CourseQuestionSchema),
    CourseAnswer : model<CourseAnswerDocument>('CourseAnswer',CourseAnswerSchema),
    Article : model<articleDocument>('Article',articleSchema),
    ArticleLike : model<articleLikeDocument>('ArticleLike',articleLikeSchema),
    ArticleComment : model<articleCommentDocument>('ArticleComment',articleCommentSchema),
    ArticleCommentReply : model<commentReplyDocument>('ArticleCommentReply',commentReplySchema),
  };
export default dbModel;