const express = require('express');

//Bring in controller methods
const {getUsers, getUser, addUser, updateUser, deleteUser} = require('../controllers/users')

const router = express.Router()
// / here represents mounted path - /api/v1/users
router.route('/').get(getUsers).post(addUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);




module.exports = router;