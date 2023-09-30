import dotenv from 'dotenv';
dotenv.config();
const getNodeMailerConfig = (userAccessToken: string) => {
    const configObject = {
        service: 'gmail',
        auth: {
        type: 'OAuth2',
        user: 'yours authorised email address',
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLEINT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: userAccessToken,
        },
    }
    return configObject;
  }

export {getNodeMailerConfig}