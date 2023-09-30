import { Document,Schema } from "mongoose";

interface IndustryTypeDocument extends Document {
    industry_type_id : number,
    industry_type_name : string,
    created_at : Date,
    updated_at : Date,
}
const industryTypeSchema = new Schema<IndustryTypeDocument>({
    industry_type_id : {type : Number, unique: true},
    industry_type_name : {type: String},
    created_at : {type: Date},
    updated_at : {type: Date},
})
export {industryTypeSchema,IndustryTypeDocument}