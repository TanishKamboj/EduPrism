import { Document,Schema } from "mongoose";

interface commentReplyDocument extends Document{
    comment_reply_id : string,
    comment_reply_description : string,
    article_comment_id : string,
    replier_user_id : string,
    created_at : Date,
    updated_at : Date
}

const commentReplySchema = new Schema<commentReplyDocument>({
    comment_reply_id :  {type : String},
    comment_reply_description : {type : String},
    article_comment_id : {type : String},
    replier_user_id : {type : String},
    created_at : {type : Date},
    updated_at : {type : Date}
})
commentReplySchema.pre<commentReplyDocument>("save", function (next) {
    this.comment_reply_id = this._id; 
    this.created_at = new Date();
    this.updated_at = new Date();
    next();
});

export { commentReplyDocument,commentReplySchema};