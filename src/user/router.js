const router = require('express').Router();

const userController = require('./controller');
const auth = require('../middleware/auth');


router.get('/register', userController.signup);

router.post('/register', userController.register);

router.get('/login', userController.signin);

router.post('/login', userController.login);

router.get('/logout', auth, userController.logout);


module.exports = router;