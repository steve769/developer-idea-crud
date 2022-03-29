const express = require('express');
const {getIdeas, getIdea, addIdea, deleteIdea, updateIdea, getIdeasByUser} = require('../controllers/ideas')

//Class the express router
const router = express.Router();

//Middleware
const {protect} = require('../middleware/auth')


router.route('/').get(getIdeas).post(protect, addIdea)
router.route('/:id').get(getIdea).put(protect, updateIdea).delete(protect, deleteIdea)
router.route('/mine').get(protect, getIdeasByUser)




module.exports = router;
