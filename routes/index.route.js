const { Router } = require('express');
const router = Router();


const AdminRoute = require('../routes/admin.routes');
const BlogRoute = require('../routes/blog.routes');

router.use('/admin', AdminRoute);
router.use('/admin/blog', BlogRoute);

module.exports = router;