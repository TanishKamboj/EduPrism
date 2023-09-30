import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();
const getHashedPassword = async(userPassword : string) =>{
    try{
        const saltRounds = Number(process.env.saltRounds);
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassowrd = await bcrypt.hash(userPassword,salt);
        return hashedPassowrd;
    }catch(err){
        return null;
    }
}

export {getHashedPassword};