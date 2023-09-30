import { Document,Schema } from "mongoose";

interface articleLikeDocument extends Document{
    article_like_id : string,
    article_id : string,
    liker_user_id : string,
    created_at : Date
}

const articleLikeSchema = new Schema<articleLikeDocument>({
    article_like_id : {type : String},
    article_id : {type : String},
    liker_user_id :  {type : String},
    created_at :  {type : Date},
})
articleLikeSchema.pre<articleLikeDocument>("save", function (next) {
    this.article_like_id = this._id;
    this.created_at = new Date();
    next();
});

export { articleLikeDocument,articleLikeSchema};