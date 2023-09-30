import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './routes/routes'
const app = express();

dotenv.config()

app.use(routes);
app.use(morgan('dev'));
const SERVICE_PORT = process.env.SERVICE_PORT;

app.listen(SERVICE_PORT,()=>{
    console.log(`API-Gateway Microservice is running on ${SERVICE_PORT} 🚀`)
    console.log(`The API docs of EduPrism is running at http://localhost:8000/api-docs 🚀`)
})