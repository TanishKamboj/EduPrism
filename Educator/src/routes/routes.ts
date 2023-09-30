import express,{Request,Response}  from "express";
import registerController from "../controller/registerController";
import joiValidator from "../middleware/joi/joiCourseValidator";
import courseController from "../controller/course/courseController";
import multer from "multer";
import {subtitleStorage,videoStorage,CourseThumbnailStorage} from "../config/multerConfig";
import CourseDescriptionController from "../controller/course/CourseDescriptionController";
import CourseContentController from "../controller/course/CourseModuleController";
import CourseChapterController from "../controller/course/CourseChapterController";
import {checkAtleastCourseEducator,checkAtleastCourseAdmin,checkAtleastCourseCC, checkOnlyTA,} from "../middleware/course/checkCourseMiddleware";
import joiCourseValidator from "../middleware/joi/joiCourseValidator";
import CourseReview from "../controller/course/CourseReview";
import CourseQNAController from "../controller/course/CourseQNAController";

const uploadSubtitle = multer({storage : subtitleStorage}); 
const uploadVideo = multer({storage : videoStorage});
const uploadCourseThumbnail =  multer({storage : CourseThumbnailStorage});
const router = express.Router();

router.get('/educator/home',(req:Request,res:Response)=>{
    res.send("The Setup of backend of Educator Microservice is successful")
})
router.post('/educator/register',joiValidator.registerEducatorMiddleware,registerController.registerEducator);
router.post('/educator/registerCourse',uploadCourseThumbnail.single('course_thumbnail'),joiValidator.courseRegisterMiddleware,courseController.registerCourse);
router.post('/educator/addCourseRole',joiCourseValidator.addCourseRoleMiddleware ,checkAtleastCourseAdmin,courseController.addCourseRole); //DONE
router.delete('/educator/removeCourseRole',joiCourseValidator.removeCourseRoleMiddleware,checkAtleastCourseAdmin,courseController.deleteCourseRole); //DONE
router.post('/educator/addDescription',checkAtleastCourseCC,CourseDescriptionController.addCourseDescription) // Done
router.get('/educator/getDescription', CourseDescriptionController.getCourseDescription) // Done
router.put('/educator/updateDescription', checkAtleastCourseCC,CourseDescriptionController.editCourseDescription); //Done
router.post('/educator/addModule',checkAtleastCourseEducator,CourseContentController.createCourseModule);// Done
router.get('/educator/getAllModule',CourseContentController.getAllCourseModule); //Done
router.put('/educator/editModule',checkAtleastCourseEducator,CourseContentController.editCourseModule); //Done
router.post('/educator/deleteModule',checkAtleastCourseEducator,CourseContentController.deleteCourseModule); //Done
router.post('/educator/addChapter',uploadVideo.single('chapter_video'),checkAtleastCourseEducator,CourseChapterController.createModuleChapter); //Done
router.put('/educator/updateChapter',uploadVideo.single('chapter_video'),checkAtleastCourseEducator,CourseChapterController.createModuleChapter); //Done
router.post('/educator/deleteChapter',checkAtleastCourseEducator,CourseChapterController.deleteModuleChapter);
router.get('/educator/getAllChapters',CourseChapterController.getAllChapters);
router.post('/educator/addSubtitle',uploadSubtitle.single('subtitle_file'),checkAtleastCourseCC,CourseChapterController.addChapterSubtitle);

router.post('/educator/deleteSubtitle',checkAtleastCourseCC,CourseChapterController.deleteSubtitle);
router.post('/educator/insertReply',checkAtleastCourseEducator,CourseReview.insertReply);
router.put('/educator/editReply',checkAtleastCourseEducator,CourseReview.editReply);
router.post('/educator/deleteReply',checkAtleastCourseEducator,CourseReview.deleteReply);

router.get('/educator/getAllReplies',CourseReview.getAllReplies);
router.post('/educator/addAnswer',checkOnlyTA,CourseQNAController.addAnswer);
router.put('/educator/editAnswer',checkOnlyTA,CourseQNAController.editAnswer);

export default router;