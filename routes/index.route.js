const { Router } = require('express');
const router = Router();


const AdminRoute = require('../routes/admin.routes');
const BlogRoute = require('../routes/blog.routes');

const ClientRoute = require('../routes/client.routes');

router.use('/admin', AdminRoute);
router.use('/admin/blog', BlogRoute);

router.use('/client', ClientRoute);

module.exports = router;