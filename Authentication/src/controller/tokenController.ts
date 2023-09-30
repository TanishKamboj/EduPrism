import {Request,Response} from 'express'
import TokenServices from '../services/TokenServices';
import sendError from '../utils/sendError';
import {isRefreshTokenValid,decodeAndVerifyToken, createToken} from '../utils/JWT/jwtUtils';
import resources from '../utils/resources';
import sendSuccess from '../utils/sendSuccess';
const refreshToken = async(req: Request,res:Response) =>{
    try{
        const {user_id} = req.query;
        const currUserID = user_id?.toString() || " ";
        const getRefreshToken = await TokenServices.getTokenData(currUserID);

        if(getRefreshToken.status === resources.status.fail){
            return sendError.sendOtherError(res,500,getRefreshToken.message || resources.messages.error.unknown)
        }

        const refreshTokenData = getRefreshToken.data

        const validRefreshToken = await isRefreshTokenValid(refreshTokenData?.token_created_at,refreshTokenData?.validity_duration || " ");
        if(validRefreshToken != true){
            return sendError.sendOtherError(res,403,resources.messages.error.invalidToken)
        }
        const decodedToken = await decodeAndVerifyToken(refreshTokenData?.refresh_token || " ");

        let currAccessToken;
        if(decodedToken === null){
            return sendError.sendOtherError(res,401,resources.messages.error.invalidToken)
        }
        if(decodedToken != null){
            const signedData = {
                user_id : decodedToken?.user_id,
                first_name : decodedToken?.first_name,
                user_type_id : decodedToken?.role_id
            }
            currAccessToken = await createToken(signedData);
        }
        sendSuccess.sendSuccessResponse(res,200,{
            status: resources.status.success,
            token : currAccessToken?.accessToken
        })
    }catch(err){
        sendError.sendServerError(res,err as Error,500)
    }
}

export default {refreshToken};