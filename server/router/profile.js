const router = require('express').Router()
const { getUserById } = require('../controllers/profileController')
const { likeUser } = require('../controllers/profileController')
const { blockUser } = require('../controllers/profileController')
const { reportUser } = require('../controllers/profileController')
const { validate } = require('../validators')
const { auth } = require('../middleware/auth')
const { rules: profileRules } = require('../validators/user/profileGet')
const { getGalleryByUser } = require('../controllers/galleryController')
//const { userFile } = require('../middleware/fileUpload')

router.post('/profile', [auth, profileRules, validate], getUserById)
router.post('/like', [auth, profileRules, validate], likeUser)
router.post('/block', [auth, profileRules, validate], blockUser)
router.post('/report', [auth, profileRules, validate], reportUser)
//router.post('/getMAtches', [auth, userFile, updateRules, validate], update)
router.post('/getGallery', [auth, profileRules, validate], getGalleryByUser)



module.exports = router