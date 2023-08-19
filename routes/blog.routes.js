const { Router } = require('express');
const BlogController = require('../controllers/admin/blog.controller');

const router = Router();

router.get('/', BlogController.getBlogs);
router.get('/drafts', BlogController.getDrafts);
router.post('/', BlogController.createBlog);
router.get('/:id', BlogController.getBlog);

module.exports = router;