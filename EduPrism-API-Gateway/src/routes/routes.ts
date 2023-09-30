import  express, {Request,Response} from "express";
import authRouter from './AuthRoutes'
import educatorRouter from './EducatorRoutes'
import learnerRouter from './LearnerRoutes'
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();
const swaggerDocument = YAML.load("./api/api.yaml");

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.get('/gateway/home',(req:Request,res:Response)=>{
    res.send("The Setup of backend of Gateway Microservice is successful")
})

router.use(authRouter);
router.use(educatorRouter);
router.use(learnerRouter);
export default router;