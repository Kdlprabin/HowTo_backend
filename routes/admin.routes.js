const { Router } = require('express');
const AdminAuthController = require('../controllers/admin/adminAuth.controller');

const router = Router();

router.post('/login', AdminAuthController.login);
router.post('/register', AdminAuthController.register);

module.exports = router;