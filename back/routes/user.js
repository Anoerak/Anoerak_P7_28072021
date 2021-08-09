const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.post('/signup', userControllers.signup);
router.post('/login/', userControllers.login);
router.get('/getInfos/:id', auth, userControllers.getInfos);
router.get('/:id/getAllPosts', auth, userControllers.getAllPosts);
router.get('/getAllUsers', auth, admin, userControllers.getAllUsers);
router.put('/flagPost/:id', auth, userControllers.flagPost);

module.exports = router;