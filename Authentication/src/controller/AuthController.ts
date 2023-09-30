import {Request,Response} from 'express'
import sendError from '../utils/sendError';
import resources from '../utils/resources';
import sendSuccess from '../utils/sendSuccess';
import { convertDate } from '../utils/convertToDateObj';
import { getHashedPassword } from '../utils/passwordUtils/makeHashPassword';
import {checkPassword} from '../utils/passwordUtils/checkCorrectPassword';
import {createToken, getEmailAccessToken} from '../utils/JWT/jwtUtils';
import { refreshTokenInterface } from '../utils/interfaces/refreshToken';
import UserServices from '../services/UserServices';
import TokenServices from '../services/TokenServices';
import forgotPasswordServices from '../services/forgotPasswordServices';
import { singUpEmail,forgotPasswordEmail } from '../utils/emails/sendEmail';
import {checkServiceError} from '../utils/catachServiceError'

const userSignUp = async (req: Request, res: Response) => {   
    try{
        const {first_name,last_name,email,password,phone_number,date_of_birth} = req.body;

        const profile_picture_path =  req.file?.path || " ";
        const userPhoneNumber = Number(phone_number);
        const currUserDOB = convertDate(date_of_birth);
        const isUserAlreadyPresent = await UserServices.isEmailAndPhoneNoPresent(email,userPhoneNumber);
        await checkServiceError(isUserAlreadyPresent);
        
        const hashPassword = await getHashedPassword(password);
        if(hashPassword === null){
            return sendError.sendOtherError(res,500,"Please Try again Later")
        }
        
        const currUserData = {
            first_name : first_name,
            last_name : last_name,
            email : email,
            password: hashPassword, 
            phone_number : userPhoneNumber,
            date_of_birth : currUserDOB,
            profile_picture_path : profile_picture_path,
        }

        const insertUserService = await UserServices.insertNewUser(currUserData);
        await checkServiceError(insertUserService);

        const responseData = {
            message : resources.messages.success.created,
            data : {
                email : insertUserService.data?.email,
                first_name : insertUserService.data?.first_name,
                last_name : insertUserService.data?.last_name,
            }
        }
        const sendEmailRequest = await singUpEmail({
            first_name : first_name,
            last_name : last_name,
            email : email
        });
        await checkServiceError(sendEmailRequest);

        sendSuccess.sendSuccessResponse(res,200,insertUserService.data || { });
    }catch(err){
        sendError.sendServerError(res,err as Error,500);
    }
}
const userLogin = async ( req: Request, res: Response) =>{
    try{
        const {email,password} = req.body;
        
        const isUserPresent = await UserServices.findUserByEmail(email);
        if(isUserPresent.status === resources.status.fail){
            return sendError.sendOtherError(res,500,isUserPresent.message || resources.messages.error.unknown);
        }
        if(isUserPresent.data === null){
            return sendError.sendOtherError(res,400,`User with email id: ${email} is not present`);
        }
        const userData = isUserPresent.data;
        const hashedPassowrd = userData?.password || " ";
        
        const isPasswordCorrect = await checkPassword(password,hashedPassowrd);

        if(isPasswordCorrect === false){
            return sendError.sendOtherError(res,401,`Wrong Password try again`);
        }
        let token : refreshTokenInterface = {
            accessToken : null,
            refreshToken : null 
        };
        let refreshToken = " ";
        let user_id = userData?.user_id ||"";

        if(userData != undefined){
            const signedData = {
                user_id : userData.user_id,
                first_name: userData.first_name,
                user_type_id : userData.user_type_id
            };
            token = await createToken(signedData);
            refreshToken = token.refreshToken || " "
        }
        
        const addRefreshToken = await TokenServices.upsertToken(refreshToken,user_id);
        if(addRefreshToken.status === resources.status.fail){
            return sendError.sendOtherError(res,500,addRefreshToken.message || resources.messages.error.unknown)
        }
        sendSuccess.sendSuccessResponse(res,200,token);
    }catch(err){
        sendError.sendServerError(res,err as Error,500);
    }
}
const forgotPassword = async (req: Request, res: Response) => {
    try{
        const {email} = req.body;
        const isUserPresent = await UserServices.findUserByEmail(email);
        
        if(isUserPresent.status === resources.status.fail){
            return sendError.sendOtherError(res,500,isUserPresent.message || "Unknown Server Error");
        }
        if(isUserPresent.data === null){
            return sendError.sendOtherError(res,400,`User with email id: ${email} is not present`);
        }
        let accessToken = " ";
        const userData = isUserPresent.data;
        if(userData != null){
            const signedData = {
                user_id : userData.user_id,
                first_name : userData.first_name,
                user_type_id : userData.user_type_id
            }
            const tokenRequest = await getEmailAccessToken(signedData);
            accessToken = tokenRequest.accessToken || " ";
        }        
        const insertForgotPassowrdToken = await forgotPasswordServices.upsertPasswordToken(accessToken,userData?.user_id ||" ");
        if(insertForgotPassowrdToken.status === resources.status.fail){
            return sendError.sendOtherError(res,500,insertForgotPassowrdToken.message || resources.messages.error.unknown);
        }
        const emailData = {
            first_name : userData?.first_name,
            email : userData?.email,
            token : accessToken,
            userID : userData?.user_id 
        }
        const sendForgotPasswordEmail = await forgotPasswordEmail(emailData);
        if(sendForgotPasswordEmail.status === resources.status.fail){
            return sendError.sendOtherError(res,500,sendForgotPasswordEmail.message || resources.messages.error.unknown);
        }
        sendSuccess.sendSuccessResponse(res,200,{
            status: resources.status.success,
            message: `The email is sent to you ${email}`,
            token : accessToken
        })
    }catch(err){
        sendError.sendServerError(res,err as Error,500);
    }
}
const resetPassword =async (req: Request, res: Response) => {
    try{
        const {token,user_id} = req.query;
        const {password} = req.body;
        const currUserId = user_id?.toString() || " ";
        
        const userTokenData = await forgotPasswordServices.getTokenByUserId(currUserId);
        if(userTokenData.status === resources.status.fail){
            return sendError.sendOtherError(res,500,userTokenData.message || resources.messages.error.unknown);
        }
        if(userTokenData.data === null){
            return sendError.sendOtherError(res,400,resources.messages.error.notFound)
        }
        if(userTokenData.data?.forgot_passwod_token != token){
            return sendError.sendOtherError(res,400,resources.messages.error.invalidToken);
        }
        
        const deleteForgetToken = await forgotPasswordServices.deleteTokenByUserId(currUserId);
        if(deleteForgetToken.status === resources.status.fail){
            return sendError.sendOtherError(res,500,deleteForgetToken.message || resources.messages.error.unknown);
        }
        
        const userDataRequest = await UserServices.findUserByID(currUserId);
        if(userDataRequest.status === resources.status.fail){
            return sendError.sendOtherError(res,500,userDataRequest.message || resources.messages.error.unknown);
        }
        
        const userData = userDataRequest.data;
        const checkSamePassword = await checkPassword(password,userData?.password || " ");
        if(checkSamePassword === true){
            return sendError.sendOtherError(res,401,resources.messages.error.passwordConflict)
        }
    
        const newUserPassword= await getHashedPassword(password || " ") || " ";
        if(newUserPassword === null){
            return sendError.sendOtherError(res,500,resources.messages.error.unknown);
        }
        
        const updatedUser = await UserServices.updateUserPassword(newUserPassword,currUserId);
        if(updatedUser.status === resources.status.fail){
            return sendError.sendOtherError(res,500,updatedUser.message || resources.messages.error.unknown);
        }

        sendSuccess.sendSuccessResponse(res,200,updatedUser.data ||{ });
    }catch(err){
        sendError.sendServerError(res,err as Error,500);
    }
}
const basicQuestion = async (req: Request, res: Response) => {
    try{
        const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
        const {skill_interests,career_goal_id} = req.body;
        const basicQuestionObj = {
            user_id : userData.user_id || " ",
            skill_interests : skill_interests || [ ],
            career_goal_id : career_goal_id || " "
        };
        const updateBasicQuestion = await UserServices.updateGoalAndInterest(basicQuestionObj);
        if(updateBasicQuestion.status === resources.status.fail){
            return sendError.sendOtherError(res,500,updateBasicQuestion.message || resources.messages.error.unknown);
        }
        sendSuccess.sendSuccessResponse(res,200,updateBasicQuestion.data || {});
    }catch(err){
        sendError.sendServerError(res,err as Error,500);
    }
}
export default {userSignUp,userLogin,forgotPassword,basicQuestion,resetPassword};