import { Document,Schema } from "mongoose";

interface EducatorRoleDocument extends Document {
    educator_role_type_id: number,
    educator_role_type_name: string,
    educator_role_type_description: string,
    created_at : Date,
    updated_at : Date,
}

const educatorRoleSchema = new Schema<EducatorRoleDocument>({
    educator_role_type_id : { type: Number,  unique: true },
    educator_role_type_name : {type: String},
    educator_role_type_description : {type: String},
    created_at: { type: Date }, 
    updated_at: { type: Date },
})

export {educatorRoleSchema,EducatorRoleDocument};