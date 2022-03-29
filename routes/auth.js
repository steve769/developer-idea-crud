//Takes care of auth for users
const express = require('express')
const {registerUser, logInUser, getMe, updateMe, deleteMyAccount, logOut} = require('../controllers/auth')

//Middleware
const {protect} = require('../middleware/auth')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', logInUser)
router.get('/logout', protect, logOut)
router.get('/me', protect, getMe)
router.put('/me/updatemyprofile', protect, updateMe)
router.delete('/me/deletemyprofile', protect, deleteMyAccount)



module.exports = router;