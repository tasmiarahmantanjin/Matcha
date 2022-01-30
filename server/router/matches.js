const router = require('express').Router()
const { match } = require('../controllers/matchesController')
const { getUserLikes } = require('../controllers/matchesController')
const { validate } = require('../validators')
const { auth } = require('../middleware/auth')
const { rules: matchRules } = require('../validators/user/userMatch')
//const { userFile } = require('../middleware/fileUpload')

router.post('/match', [auth, matchRules, validate], match)
router.post('/getUserLikes', [auth, matchRules, validate], getUserLikes)
//router.post('/getMAtches', [auth, userFile, updateRules, validate], update)


module.exports = router