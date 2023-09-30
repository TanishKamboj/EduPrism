import dbModel from '../config/db/modelCreation'
import resources from '../utils/resources'
import { careerGoalDocument } from '../models/CareerGoal';

export default {
    async insertNewCarrerObject(careerObject: careerGoalDocument) {
        try{
            const{career_goal_id,career_goal_name,career_goal_description} = careerObject;
            const newCareerGoal = new dbModel.CareerGoals({
                career_goal_id: career_goal_id,
                career_goal_name: career_goal_name,
                career_goal_description: career_goal_description,
                created_at: new Date(),
                updated_at: new Date(),
            })
            newCareerGoal.save();
            return{
                status: resources.status.success,
                data: newCareerGoal   
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message: resources.messages.error.generic(err as Error)
            }
        }
    }
    
}