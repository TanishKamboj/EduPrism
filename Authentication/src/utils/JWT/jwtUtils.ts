import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import resources from '../resources';
import { userDataTokenInterface } from '../interfaces/userDataTokenInterface';
dotenv.config();

const createToken = async (userData : userDataTokenInterface) => {
    try{
        const signedData = {
            user_id : userData.user_id,
            first_name : userData.first_name,
            role_id : userData.user_type_id
        }
        const jwtToken = process.env.JWT_TOKEN_KEY || " ";
        const accessToken = jwt.sign(signedData,jwtToken,{
            expiresIn : process.env.ACCESS_TOKEN_EXPIRATION
        });
        const refreshToken = jwt.sign(signedData,jwtToken,{
            expiresIn : process.env.REFRESH_TOKEN_EXPIRATION
        });
        return{
            accessToken : accessToken,
            refreshToken : refreshToken
        }
    }catch(err){
        return{
            accessToken : null,
            refreshToken : null 
        }
    }
}
const getEmailAccessToken =async (userData:userDataTokenInterface) => {
    try{
        const signedData = {
            user_id : userData.user_id,
            first_name : userData.first_name,
            role_id : userData.user_type_id
        }
        const jwtToken = process.env.JWT_TOKEN_KEY || " ";
        const accessToken = jwt.sign(signedData,jwtToken,{
            expiresIn : process.env.ACCESS_TOKEN_EXPIRATION
        });
        return{
            accessToken : accessToken,
        }
    }catch(err){
        return{
            accessToken : null,
        }
    }
}
const isRefreshTokenValid = async (tokenDurationObject : Date | undefined,validityDuration : string) =>{
    try{
        if(tokenDurationObject){
        const currentTime = new Date();
        let tokenRegisterTime = tokenDurationObject;
        if(validityDuration.includes('d')){
            const countDays = parseInt(validityDuration);
            tokenRegisterTime.setDate(tokenRegisterTime.getDate() + countDays);
        }
        if(validityDuration.includes('hr')){
            const countHours = parseInt(validityDuration);
            tokenRegisterTime.setHours(tokenRegisterTime.getHours() + countHours);
        }
        if(validityDuration.includes('m')){
            const countMinuits = parseInt(validityDuration);
            tokenRegisterTime.setMinutes(tokenRegisterTime.getMinutes() + countMinuits);
        }
        if(tokenRegisterTime >= currentTime){
            return true;
        }
        else{
            return false;
        }
    }
    }catch(err){
        return null;
    }
}
const decodeAndVerifyToken = async(refreshToken : string) : Promise<JwtPayload> =>{
    try{
        const decodedRefreshToken = jwt.verify(refreshToken ||" ", process.env.JWT_TOKEN_KEY || " ");
        return decodedRefreshToken as JwtPayload ;
    }catch(err){
        return {
            status: resources.status.fail,
            data: resources.messages.error.generic(err as Error)
        }
    }
}
export {createToken,getEmailAccessToken,isRefreshTokenValid,decodeAndVerifyToken}