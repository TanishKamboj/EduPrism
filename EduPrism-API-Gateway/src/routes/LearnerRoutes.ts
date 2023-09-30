import  express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import proxyConfig from '../config/httpProxyConfig'
import { verifyJwtTokenPrivate } from "../middleware/JWT/verifyJWTPrivate";
const router = express.Router();

router.get('/learner/home',createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/getCourseByIndustry',createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/getCourseBySkill',createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/getFullCourseData',createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/getChapterDataByModule',createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/getFullChapterData',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/getReview',createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/getAllCourseReview',createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/getAllQuestions',createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/getFullQuestion',createProxyMiddleware(proxyConfig.learnerServiceSettings));

router.post('/learner/addOrder',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.post('/learner/addReview',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.delete('/learner/deleteReview',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.put('/learner/editReview',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.post('/learner/addQuestion',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.put('/learner/editQuestion',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/getFullAnswer',createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/getAllAnswer',createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.post('/learner/addAnswer',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.put('/learner/editAnswer',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));

router.post('/learner/createArticle',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.post('/learner/deleteArticle',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.post('/learner/likeArticle',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.post('/learner/unlikeArticle',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/getAllArticles',createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/searchArticle',createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/getFullCommentData',createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/getFullArticleData',createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/getAllComments',createProxyMiddleware(proxyConfig.learnerServiceSettings));

router.post('/learner/addArticleComment',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.put('/learner/editArticleComment',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.post('/learner/addCommentReply',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.post('/learner/deleteCommentReply',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.put('/learner/editCommentReply',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.get('/learner/getAllCommentReplies',createProxyMiddleware(proxyConfig.learnerServiceSettings));
router.post('/learner/deleteComment',verifyJwtTokenPrivate,createProxyMiddleware(proxyConfig.learnerServiceSettings));

export default router