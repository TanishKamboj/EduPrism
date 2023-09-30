import express from 'express';
import dotenv from 'dotenv';
import dbConfig from './config/db/dbConfig';
import routes from './routes/routes'

//TODO-THIS MICROSERVICE IS JUST MADE TO ADD SOME VALUES 
//TODO-ALL THE BUGS FIXES/FUNCTONALITY WILL BE ADDED LATER

const app = express();

dotenv.config();
app.use(express.json());
app.use(routes);

const SERVICE_PORT = process.env.SERVICE_PORT; 
const dbURL = process.env.MONGO_URL;

if(dbURL){
    dbConfig.Connect(dbURL)
}

app.listen(SERVICE_PORT,()=>{
    console.log(`Admin Microservice is running at PORT ${SERVICE_PORT}`)
});