const express = require('express');
const router = express.Router();
const multerProfil = require('../middlewares/multer-profil-config')
const auth = require('../middlewares/auth');

const profilControllers = require('../controllers/profil');

router.put('/profilPicture/', multerProfil, profilControllers.updateProfilPicture);
router.put('/updatePassword/', profilControllers.updatePassword);
router.put('/deleteAccount/', profilControllers.deleteAccount);

module.exports = router;