import { Document,Schema } from "mongoose";

interface CourseReviewReplyDocument extends Document{
    review_reply_id : string,
    review_id : string,
    replyer_user_id : string,
    reply_description : string,
    created_at : Date,
    updated_at : Date
}
const CourseReviewReplySchema = new Schema<CourseReviewReplyDocument>({
    review_reply_id : {type : String},
    review_id : {type : String},
    replyer_user_id : {type : String},
    reply_description : {type : String},
    created_at : Date,
    updated_at : Date
})
CourseReviewReplySchema.pre<CourseReviewReplyDocument>("save", function (next) {
    this.review_reply_id = this._id;
    this.created_at = new Date();
    this.updated_at = new Date();
    next();
});

export {CourseReviewReplyDocument,CourseReviewReplySchema};