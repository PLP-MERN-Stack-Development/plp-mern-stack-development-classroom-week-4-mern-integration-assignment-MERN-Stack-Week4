const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

// Make sure all are functions, no extra parentheses
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', protect, postController.createPost);
router.put('/:id', protect, postController.updatePost);
router.delete('/:id', protect, postController.deletePost);

module.exports = router;


