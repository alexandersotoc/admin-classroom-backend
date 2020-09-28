const { Router } = require('express');
const router = Router();

const UsersController = require('../controllers/users');

const { checkAuth } = require('../middlewares/authentication');

router.get('/', checkAuth, UsersController.getAllUsers);
router.post('/', UsersController.createUser);

module.exports = router;