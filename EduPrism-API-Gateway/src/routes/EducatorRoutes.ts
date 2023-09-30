import  express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import proxyConfig from '../config/httpProxyConfig'
import { verifyJwtTokenPrivate } from "../middleware/JWT/verifyJWTPrivate";
const router = express.Router();

router.get('/educator/home',createProxyMiddleware(proxyConfig.educatorServiceSettings))
router.post('/educator/register',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.post('/educator/registerCourse',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.post('/educator/addCourseRole',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.delete('/educator/removeCourseRole',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.post('/educator/addSubtitle',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));

router.post('/educator/addDescription',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.get('/educator/getDescription',createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.put('/educator/updateDescription',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.post('/educator/addModule',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.get('/educator/getAllModule',createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.put('/educator/editModule',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.post('/educator/deleteModule',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.post('/educator/addChapter',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.put('/educator/updateChapter',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.post('/educator/deleteChapter',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.get('/educator/getAllChapters',createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.post('/educator/deleteSubtitle',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.post('/educator/insertReply',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.put('/educator/editReply',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.get('/educator/getAllReplies',createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.post('/educator/deleteReply',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.post('/educator/addAnswer',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));
router.put('/educator/editAnswer',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.educatorServiceSettings));


export default router;