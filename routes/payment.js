//Takes care of auth for users
const express = require('express')
//Controllers
const {sponsorProject} = require('../controllers/payment')
//Middleware
const {protect} = require('../middleware/auth')

const router = express.Router()


router.post('/sponsor-project', protect, sponsorProject)




module.exports = router;