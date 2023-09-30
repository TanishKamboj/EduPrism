import {google}  from 'googleapis';
const getEmailAccessToken = async(gmailClientId : string,gmailCliendSecret :string,gmailRedirectURI:string,gmailRefreshToken:string ) =>{
   try{ const oAuth2Client = new google.auth.OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLEINT_SECRET,
        process.env.GMAIL_REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });
    const accessToken = await oAuth2Client.getAccessToken();
    return accessToken;
    }
    catch(err){
        console.log(err);
        return null
    }
}
export {getEmailAccessToken}