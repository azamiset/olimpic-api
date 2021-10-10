const router = require('express').Router();
const pagesController = require('./controller');

router.get('/', pagesController.home);

router.get('/about', pagesController.about);

module.exports = router;