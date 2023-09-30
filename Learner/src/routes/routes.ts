import express ,{Request,Response}  from "express";
import CourseController from "../controller/CourseController";
import OrderController from "../controller/OrderController";
import { isCourseOwner,isQuestionnaire } from "../middleware/CourseMiddleware";
import CourseReviewController from "../controller/CourseReviewController";
import CourseReviewReply from "../controller/CourseReviewReply";
import CourseQNAController from "../controller/CourseQNAController";
import ArticleController from "../controller/ArticleController/ArticleController";
import multer from "multer";
import { articleStorage } from "../config/multerConfig";
import ArticleCommentController from "../controller/ArticleController/ArticleCommentController";
import { isArticlePresent, isUserCommenter } from "../middleware/ArticleMiddleware";
const router = express.Router();
const uploadArticle = multer({storage : articleStorage});

router.get('/learner/home',(req:Request,res:Response)=>{
    res.send("The Setup of backend of Learner Microservice is successful")
}) 
router.get('/learner/getCourseByIndustry',CourseController.getCoursesWithIndustry);
router.get('/learner/getCourseBySkill',CourseController.getCoureseWithSkill);
router.get('/learner/getFullCourseData',CourseController.getFullCourseData);
router.get('/learner/getChapterDataByModule',CourseController.getMinimalChapterData);
router.get('/learner/getFullChapterData',isCourseOwner,CourseController.getFullChapterData);
router.get('/learner/getReview',CourseReviewController.getReview);
router.get('/learner/getAllCourseReview',CourseReviewController.getAllReview);

router.post('/learner/addOrder',OrderController.addSingleOrder);

router.post('/learner/addReview',isCourseOwner,CourseReviewController.addCourseReview);
router.put('/learner/editReview',isCourseOwner,CourseReviewController.editCourseReview);
router.delete('/learner/deleteReview',isCourseOwner,CourseReviewController.deleteCourseReview);

router.post('/learner/insertReply',isCourseOwner,CourseReviewReply.insertReply);
router.post('/learner/editReply',isCourseOwner,CourseReviewReply.editReply);
router.post('/learner/deleteReply',isCourseOwner,CourseReviewReply.deleteReply);
router.get('/learner/getAllReplies',CourseReviewReply.getAllReplies);

router.post('/learner/addQuestion',isCourseOwner,CourseQNAController.addQuestion);
router.put('/learner/editQuestion',isCourseOwner,CourseQNAController.editQuestion);
router.get('/learner/getAllQuestions',CourseQNAController.getAllQuestion);
router.get('/learner/getFullQuestion',CourseQNAController.getFullQuestion);

router.post('/learner/addAnswer',isQuestionnaire,CourseQNAController.addAnswer);
router.put('/learner/editAnswer',isQuestionnaire,CourseQNAController.editAnswer);

router.get('/learner/getFullAnswer', CourseQNAController.getFullAnswer);
router.get('/learner/getAllAnswer',CourseQNAController.getAllAnswers);

router.post('/learner/createArticle',uploadArticle.single('article-image'),ArticleController.createArticle);
router.get('/learner/getAllArticles',ArticleController.getAllArticles)
router.get('/learner/searchArticle',ArticleController.searchKeywordInArticle);
router.post('/learner/likeArticle',ArticleController.likeArticle);
router.post('/learner/unlikeArticle',ArticleController.unlikeArticle);

router.post('/learner/addArticleComment',isArticlePresent,ArticleCommentController.addArticleComment);
router.put('/learner/editArticleComment',isUserCommenter,ArticleCommentController.editArticleComment);
router.get('/learner/getAllComments', ArticleCommentController.getAllComments);

router.post('/learner/addCommentReply',ArticleCommentController.addCommentReply);
router.post('/learner/deleteCommentReply',ArticleCommentController.deleteCommentReply);
router.put('/learner/editCommentReply',ArticleCommentController.editCommentReply);
router.get('/learner/getAllCommentReplies',ArticleCommentController.getAllCommentReplies);
router.get('/learner/getFullCommentData',ArticleCommentController.getFullCommentData);

router.post('/learner/deleteComment',isUserCommenter,ArticleCommentController.deleteComment);
router.get('/learner/getFullArticleData',ArticleController.getFullArticleData);

router.post('/learner/deleteArticle',ArticleController.deleteArticle);
export default router;