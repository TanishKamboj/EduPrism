import { Document,Schema } from "mongoose";

interface articleTagDocument extends Document {
    article_tag_id: number,
    article_tag_name: string,
    created_at : Date,
    updated_at : Date,
}

const articleTagSchema = new Schema<articleTagDocument>({
    article_tag_id : { type: Number},
    article_tag_name : {type: String},
    created_at: { type: Date }, 
    updated_at: { type: Date },
})
export {articleTagSchema,articleTagDocument};