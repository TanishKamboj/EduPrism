import  {Document,Schema} from "mongoose";

interface UserDocument extends Document{
    user_id : string,
    first_name : string,
    last_name : string,
    email : string,
    password: string,
    phone_number : number,
    user_type_id : number,
    skill_interests: number[],
    career_goal_id : number,
    date_of_birth : Date,
    profile_picture_path: string,
    organization_id : string,
    organization_head_user_id : string,
    created_at : Date,
    updated_at : Date,
}
const userSchema = new Schema<UserDocument>({
    user_id : {type : String},
    first_name : {type : String},
    last_name :{type : String},
    email : {type : String},
    password: {type : String},
    phone_number : {type: Number},
    user_type_id : {type: Number},
    skill_interests: {type: [Number]},
    career_goal_id : {type: Number},
    date_of_birth : Date,
    profile_picture_path: {type : String, default : " "},
    organization_id : {type : String},
    organization_head_user_id : {type : String},
    created_at : Date,
    updated_at : Date,
})
userSchema.pre<UserDocument>("save", function (next) {
    this.user_id = this._id;
    next();
});
export {userSchema, UserDocument};