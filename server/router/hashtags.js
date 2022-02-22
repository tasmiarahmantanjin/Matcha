const router = require('express').Router()
const { getHashtags } = require('../controllers/hashtagController')

router.get('/getHashtags', getHashtags)

module.exports = router
