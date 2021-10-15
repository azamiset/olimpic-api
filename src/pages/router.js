const router = require("express").Router();
const pagesController = require("./controller");
const auth = require("../middleware/auth");

router.get("/", auth, pagesController.home);

router.get("/about", auth, pagesController.about);

router.get("/contact", auth, pagesController.contact);

module.exports = router;
