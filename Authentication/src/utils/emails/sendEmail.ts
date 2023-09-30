import dotenv from 'dotenv';
dotenv.config();
import * as fs from 'fs';
import resources from '../resources';
import nodemailer from 'nodemailer';
import path from 'path';
import { emailDataInterface } from '../interfaces/email/emailDataInterface';
import { getEmailAccessToken } from './emailAccessToken';
import { forgotPasswordInterface } from '../interfaces/email/forgotPasswordInterface';

const singUpEmail = async (userData : emailDataInterface) => {
    try{
        const htmlFilePath = path.join(__dirname, 'SignUpEmail', 'SignUpSetup.html');
        const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
        const formattedHTML = htmlContent
        .replace(/\${firstName}/g, userData.first_name || " ")
        .replace(/\${lastName}/g, userData.last_name || " ")

        const accessToken = await getEmailAccessToken(process.env.GMAIL_CLIENT_ID || " ", process.env.GMAIL_CLEINT_SECRET || " ", process.env.GMAIL_REDIRECT_URI || " ",process.env.GMAIL_REFRESH_TOKEN || " ")
        
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: process.env.GMAIL_TEAM_EMAIL_ID,
              clientId: process.env.GMAIL_CLIENT_ID,
              clientSecret: process.env.GMAIL_CLEINT_SECRET,
              refreshToken: process.env.GMAIL_REFRESH_TOKEN,
              accessToken: accessToken,
            },
        } as any);  
        
          const mailOptions = {
            from: `Team EduPrism 🐱‍👓🐱‍👓 <${process.env.GMAIL_TEAM_EMAIL_ID}>`,
            to: userData.email,
            subject: `Welcome ${userData.first_name}!`,
            html: formattedHTML,
          };
        const result = await transport.sendMail(mailOptions);
        return{
            status: resources.status.success,
            data: result
        }
    }catch(err){
        return{
            status: resources.status.fail,
            message: resources.messages.error.generic(err as Error)
        }
    }
}
const forgotPasswordEmail = async (userData : forgotPasswordInterface) => {
    try{
        const htmlFilePath = path.join(__dirname, 'forgotPassword', 'forgotPassword.html');
        const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
        
        const formattedHTML = htmlContent
        .replace(/\${firstName}/g, userData.first_name || " ")
        .replace(/\${Link}/g, userData.token || " ")
        .replace(/\${FrontEndPort}/g, process.env.FRONT_END_PORT || "3001")
        .replace(/\${token}/g, userData.token || " ")
        .replace(/\${userId}/g, userData.userID || " ")

        const accessToken = await getEmailAccessToken(process.env.GMAIL_CLIENT_ID || " ", process.env.GMAIL_CLEINT_SECRET || " ", process.env.GMAIL_REDIRECT_URI || " ",process.env.GMAIL_REFRESH_TOKEN || " ")
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: process.env.GMAIL_TEAM_EMAIL_ID,
              clientId: process.env.GMAIL_CLIENT_ID,
              clientSecret: process.env.GMAIL_CLEINT_SECRET,
              refreshToken: process.env.GMAIL_REFRESH_TOKEN,
              accessToken: accessToken,
            },
        } as any);  
        
          const mailOptions = {
            from: `Team EduPrism 🐱‍👓🐱‍👓 <${process.env.GMAIL_TEAM_EMAIL_ID}>`,
            to: userData.email,
            subject: `Reset your password ${userData.first_name}!`,
            html: formattedHTML,
          };
        const result = await transport.sendMail(mailOptions);
        return{
            status: resources.status.success,
            data: result
        }
    }catch(err){
        return{
            status: resources.status.fail,
            message: resources.messages.error.generic(err as Error)
        }
    }
}
export {singUpEmail,forgotPasswordEmail};