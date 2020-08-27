const { Router } = require('express');
const router = Router();

const UsersController = require('../controllers/users');

router.get('/', UsersController.getAllUsers);
router.post('/', UsersController.createUser);

module.exports = router;