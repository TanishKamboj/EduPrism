import dotenv from 'dotenv';
dotenv.config();
const authServiceURL = process.env.AUTH_MICROSERVICE_URL;
const educatorServiceURL = process.env.EDUCATOR_MICROSERVICE_URL;
const learnerServiceURL = process.env.LEARNER_MICROSERVICE_URL
export default  {
    authServiceSettings : { 
        target:  authServiceURL, 
        changeOrigin: true,
    },
    educatorServiceSettings: {
        target : educatorServiceURL,
        changeOrigin: true,
    },
    learnerServiceSettings :{
        target : learnerServiceURL,
        changeOrigin: true,
    }
}