import { Document,Schema } from "mongoose";

interface EducatorDocument extends Document{
    educator_id : string,
    user_id : string,
    educator_description: string,
    course_id_list : number[],
    EduPrism_Partner : boolean,
    twitter_url : string,
    portfolio_website_url: string,
    linkedin_url : string,
    created_at : Date,
    updated_at : Date
}
const educatorSchema = new Schema<EducatorDocument>({
    educator_id : {type: String},
    user_id : {type: String},
    educator_description: {type: String},
    course_id_list : {type : [Number]},
    EduPrism_Partner : {type : Boolean},
    twitter_url : {type: String},
    portfolio_website_url: {type: String},
    linkedin_url : {type: String},
    created_at : Date,
    updated_at : Date,
})
educatorSchema.pre<EducatorDocument>("save", function (next) {
    this.educator_id = this._id;
    this.EduPrism_Partner = false;
    next();
});
export {EducatorDocument,educatorSchema};