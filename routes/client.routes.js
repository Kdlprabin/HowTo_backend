const { Router } = require('express');

const BlogController = require('../controllers/client/blog.controller');

const router = Router();

router.get('/blog/', BlogController.getBlogs);
router.get('/blog/:id', BlogController.getBlog);

module.exports = router;