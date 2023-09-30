import { Document,Schema } from "mongoose";

interface articleCommentDocument extends Document{
    article_comment_id : string,
    article_id : string,
    article_commenter_user_id : string,
    article_commenter_description : string,
    created_at : Date,
    updated_at : Date
}

const articleCommentSchema = new Schema<articleCommentDocument>({
    article_comment_id :  {type : String},
    article_id : {type : String},
    article_commenter_user_id : {type : String},
    article_commenter_description : {type : String},
    created_at : {type : Date},
    updated_at : {type : Date}
})
articleCommentSchema.pre<articleCommentDocument>("save", function (next) {
    this.article_comment_id = this._id;
    this.created_at = new Date();
    this.updated_at = new Date();
    next();
});

export { articleCommentDocument,articleCommentSchema};