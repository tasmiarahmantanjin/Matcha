const router = require('express').Router()
const { update } = require('../controllers/userController')
const { validate } = require('../validators')
const { auth } = require('../middleware/auth')
const { rules: updateRules } = require('../validators/user/userUpdate')
const { rules: uploadRules } = require('../validators/user/galleryUpload') // Currently empty, should be fixed.
const { galleryUpload } = require('../controllers/galleryController')
const { userFile } = require('../middleware/fileUpload')
const { galleryFile } = require('../middleware/galleryUpload')

const { getGalleryByUser } = require('../controllers/galleryController')
const { deleteGalleryImage } = require('../controllers/galleryController')
const { makeAvatarImage } = require('../controllers/galleryController')
const { getConversationsArray } = require('../controllers/conversationController')

router.post('/update', [auth, userFile, updateRules, validate], update)
router.post('/galleryUpload', [auth, galleryFile, uploadRules, validate], galleryUpload)
router.post('/getGallery', [/*auth, */uploadRules, validate], getGalleryByUser) // Should have different validation.
router.post('/deleteGalleryImage', [/*auth, */ uploadRules, validate], deleteGalleryImage)
router.post('/makeAvatarImage', [/*auth, */ uploadRules, validate], makeAvatarImage)
router.post('/getConversationsArray', [/*auth, */uploadRules, validate], getConversationsArray) // Should have different validation.



module.exports = router