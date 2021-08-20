const router = require('express').Router()
const { update } = require('../controllers/userController')
const { validate } = require('../validators')
const { auth } = require('../middleware/auth')
const { rules: updateRules } = require('../validators/user/userUpdate')
const { rules: uploadRules } = require('../validators/user/galleryUpload')
const { galleryUpload } = require('../controllers/userController')
const { userFile } = require('../middleware/fileUpload')
const { galleryFile } = require('../middleware/galleryUpload')

router.post('/update', [auth, userFile, updateRules, validate], update)
router.post('/galleryUpload', [auth, galleryFile, uploadRules, validate], galleryUpload)



module.exports = router