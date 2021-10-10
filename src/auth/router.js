const router = require('express').Router();
const authController = require('./controller');


router.get('/register', authController.signup);

router.post('/register', authController.register);

router.get('/login', authController.signin);

router.post('/login', authController.login);


module.exports = router;