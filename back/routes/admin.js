const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const adminControllers = require('../controllers/admin');

router.get('/users/', auth, admin, adminControllers.getStatsUsers);
router.get('/posts/', auth, admin, adminControllers.getStatsPosts);
router.get('/comments/', auth, admin, adminControllers.getStatsComments);
router.get('/flagged/', auth, admin, adminControllers.getStatsFlagged);
router.get('/flaggedPosts/', auth, admin, adminControllers.getFlaggedPosts);
router.put('/flagPost/:id', auth, admin, adminControllers.unflagPost);
router.put('/deleteUser/:id',auth, admin, adminControllers.deleteAccount);
router.put('/deletePost/:id', auth, admin, adminControllers.deletePost);
router.put('/deleteComment/:id',auth, admin, adminControllers.deleteComment);
router.put('/modifyPrivileges/:id', auth, admin, adminControllers.modifyPrivileges);

module.exports = router;