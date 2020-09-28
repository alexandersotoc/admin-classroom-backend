const { Router } = require('express');
const router = Router();

const CoursesController = require('../controllers/courses');

const { checkAuth } = require('../middlewares/authentication');

router.get('/', checkAuth, CoursesController.getAllCourses);
router.post('/', checkAuth, CoursesController.createCourse);
router.patch('/:courseId', checkAuth, CoursesController.updateCourse);

module.exports = router;