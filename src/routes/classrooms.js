const { Router } = require('express');
const router = Router();

const ClassroomsController = require('../controllers/classrooms');

const { checkAuth } = require('../middlewares/authentication');

router.get('/', checkAuth, ClassroomsController.getAllClassrooms);
router.post('/', checkAuth, ClassroomsController.createClassroom);
router.get('/:classroomId/students', checkAuth, ClassroomsController.getStudents);
router.post('/:classroomId/students', checkAuth, ClassroomsController.addStudent);
router.delete('/:classroomId/students', checkAuth, ClassroomsController.removeStudent);

module.exports = router;