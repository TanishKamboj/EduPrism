import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import db from './config/db/dbConfig';
import routes from './routes/routes';

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

const PORT  = process.env.SERVICE_PORT;
const dbUrl = process.env.MONGO_URL;

if(dbUrl){
    db.Connect(dbUrl);
}

app.listen(PORT,()=>{
    console.log(`Educator Microservice is running on ${PORT} 🚀`)
});