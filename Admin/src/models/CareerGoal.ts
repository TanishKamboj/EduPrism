import { Document,Schema } from "mongoose";

interface careerGoalDocument extends Document {
    career_goal_id: number,
    career_goal_name: string,
    career_goal_description: string,
    created_at : Date,
    updated_at : Date,
}

const careerGoalSchema = new Schema<careerGoalDocument>({
    career_goal_id : { type: Number,  unique: true },
    career_goal_name : {type: String},
    career_goal_description : {type: String},
    created_at: { type: Date }, 
    updated_at: { type: Date },
})
export {careerGoalSchema,careerGoalDocument};