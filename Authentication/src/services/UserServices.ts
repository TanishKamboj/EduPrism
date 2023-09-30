import dbModel from '../config/db/modelCreation';
import resources from '../utils/resources';
import {signUpInterFace} from '../utils/interfaces/authInterface';
import { basicQuestionInterface } from '../utils/interfaces/basicQuestionsInterface';

export default {
    async isEmailAndPhoneNoPresent(email : string, phone_number : number){
        try{   
            let alreadyPresentField = " ";
            const isUserPresent  = await dbModel.Users.findOne({
                $or : [
                    {email  : email},
                    {phone_number : phone_number}
                ]
            });
            if(isUserPresent?.email === email){
                alreadyPresentField = "email";
            }
            else if(isUserPresent?.phone_number === phone_number){
                alreadyPresentField = "Phone Number"
            }
            if(alreadyPresentField === " "){
                return{
                    status : resources.status.success,
                    data : {}
                } 
            }
            else{
                return{
                    status :resources.status.fail,
                    message : `User with ${alreadyPresentField} is already present`
                }
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }

    },
    async insertNewUser(userObj : signUpInterFace){
        try{
            const newUser = new dbModel.Users({
                ...userObj,
                user_type_id : resources.userTypes.Learner
            });
            newUser.save();
            return{
                status: resources.status.success,
                data: newUser
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async findUserByEmail(email: string ){
        try{
            const userData = await dbModel.Users.findOne({
                email : email
            })
            return{
                status: resources.status.success,
                data : userData
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async updateUserPassword(password:string,user_id:string){
        try{
            const updatedUser = await dbModel.Users.updateOne(
                { user_id: user_id },
                {
                  $set: {
                    password: password,
                    updated_at : new Date()     
                 }
                }
            );
            return{
                status: resources.status.success,
                data : {
                    user_id : user_id,
                    newPassword : password,
                    data: updatedUser
                }
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async updateGoalAndInterest(userObj:basicQuestionInterface){
        try{
            const {user_id,skill_interests,career_goal_id} = userObj;
            const updatedUser = await dbModel.Users.findOneAndUpdate(
                { user_id: user_id },
                {
                    $set: {
                        career_goal_id: career_goal_id,
                        updated_at : new Date()
                    },
                    $addToSet: {
                        skill_interests: { $each: skill_interests },
                    },
                },
                { new: true }
            );
            return{
                status: resources.status.success,
                data : {
                    user_id : updatedUser?.user_id,
                    first_name : updatedUser?.first_name,
                    email : updatedUser?.email
                }
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async findUserByID(user_id: string ){
        try{
            const userData = await dbModel.Users.findOne({
                user_id : user_id
            })
            return{
                status: resources.status.success,
                data : userData
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },

}