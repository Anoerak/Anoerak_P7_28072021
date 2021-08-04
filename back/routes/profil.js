const express = require('express');
const router = express.Router();
const multerProfil = require('../middleware/multer-profil-config')
const auth = require('../middleware/auth');

const profilControllers = require('../controllers/profil');

router.put('/profilPicture/', auth, multerProfil, profilControllers.updateProfilPicture);
router.put('/changePassword/', auth, profilControllers.changePassword);
router.put('/deleteAccount/', auth, profilControllers.deleteAccount);

module.exports = router;