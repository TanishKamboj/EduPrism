import { Document,Schema } from "mongoose";

interface CourseReviewDocument extends Document{
    course_review_id : string,
    course_id : string,
    reviewer_user_id : string,
    featured_review : boolean,
    review_description : string,
    course_rating : number,
    created_at : Date,
    updated_at : Date
}
const CourseReviewSchema = new Schema<CourseReviewDocument>({
    course_review_id : {type : String},
    course_id : {type : String},
    reviewer_user_id : {type : String},
    review_description : {type : String},
    featured_review : {type : Boolean},
    course_rating : {type : Number},
    created_at : {type : Date},
    updated_at : {type : Date}
})
CourseReviewSchema.pre<CourseReviewDocument>("save", function (next) {
    this.created_at = new Date();
    this.updated_at = new Date();
    this.course_review_id = this._id;
    this.featured_review = false;
    next();
});

export {CourseReviewDocument,CourseReviewSchema};