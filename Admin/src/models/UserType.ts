import { Document, Schema } from "mongoose";

interface UserTypeDocument extends Document{
    user_type_id : number,
    user_type_name: string,
    created_at : Date,
    updated_at : Date,
}
const userTypeSchema = new Schema<UserTypeDocument>({
    user_type_id : {type: Number, unique: true},
    user_type_name : {type: String},
    created_at : {type: Date},
    updated_at : {type: Date},
})

export {userTypeSchema,UserTypeDocument};