import bcrypt from 'bcrypt'

const checkPassword  = async (userPassword:string,hashPassword : string ) => {
    try{  
        return await bcrypt.compare(userPassword,hashPassword);
    }catch(err){
        return null;
    }
}
export  {checkPassword}; 