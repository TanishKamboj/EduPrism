import { Document,Schema } from "mongoose";

interface articleDocument extends Document{
    article_id : string,
    article_title : string,
    article_description : string,
    author_user_id : string,
    article_tag_list : number[],
    article_skill_list : number[],
    article_picture_path : string,
    created_at : Date,
    updated_at : Date
}
const articleSchema = new Schema<articleDocument>({
    article_id : {type : String},
    article_title :  {type : String},
    article_description :  {type : String},
    author_user_id :  {type : String},
    article_tag_list : {type : [Number]},
    article_skill_list : {type : [Number]},
    article_picture_path :  {type : String},
    created_at :  {type : Date},
    updated_at : {type : Date},
})
articleSchema.pre<articleDocument>("save", function (next) {
    this.article_id = this._id;
    this.created_at = new Date();
    this.updated_at = new Date();
    next();
});

export {articleDocument,articleSchema};