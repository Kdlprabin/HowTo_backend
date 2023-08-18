const { Router } = require('express');
const router = Router();


const AdminRoute = require('../routes/admin.routes');


router.use('/admin', AdminRoute);

module.exports = router;