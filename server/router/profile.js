const router = require('express').Router()
const { getUserById } = require('../controllers/profileController')
const { likeUser } = require('../controllers/profileController')
const { validate } = require('../validators')
const { auth } = require('../middleware/auth')
const { rules: profileRules } = require('../validators/user/profileGet')
//const { userFile } = require('../middleware/fileUpload')

router.post('/profile', [auth, profileRules, validate], getUserById)
router.post('/like', [auth, profileRules, validate], likeUser)
//router.post('/getMAtches', [auth, userFile, updateRules, validate], update)


module.exports = router