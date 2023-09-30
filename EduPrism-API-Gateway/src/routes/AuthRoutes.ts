import  express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import proxyConfig from '../config/httpProxyConfig'
import { verifyJwtTokenPrivate } from "../middleware/JWT/verifyJWTPrivate";
const router = express.Router();

router.get('/auth/home',createProxyMiddleware(proxyConfig.authServiceSettings));
router.post('/auth/signup',createProxyMiddleware(proxyConfig.authServiceSettings));
router.post('/auth/login',createProxyMiddleware(proxyConfig.authServiceSettings));
router.post('/auth/forgotPassword',createProxyMiddleware(proxyConfig.authServiceSettings));
router.post('/auth/basicQuestion',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.authServiceSettings));
router.post('/auth/resetPassword',createProxyMiddleware(proxyConfig.authServiceSettings));
router.post('/auth/refreshToken',createProxyMiddleware(proxyConfig.authServiceSettings));
router.get('/auth/getSkills',createProxyMiddleware(proxyConfig.authServiceSettings));
router.get('/auth/getAllIndustry',createProxyMiddleware(proxyConfig.authServiceSettings));

export default router;