import { Document,Schema } from "mongoose";

interface SkillInterestDocument extends Document{
    skill_interest_id : number,
    industry_type_id : number,
    skill_name : string,
    created_at : Date,
    updated_at : Date,
}

const SkillInterestSchema = new Schema<SkillInterestDocument>({
    skill_interest_id : {type: Number, unique: true},
    industry_type_id : {type: Number},
    skill_name : {type: String},
    created_at : {type: Date},
    updated_at : {type: Date},
})
export {SkillInterestDocument,SkillInterestSchema}