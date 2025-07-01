const slugify = require('slugify');
const Post = require('../models/Post');

exports.createPost = async (req, res, next) => {
  try {
    console.log('createPost called');
    const { title, content, category } = req.body;
    console.log('Request body:', req.body);
    console.log('User from token:', req.user);

    if (!title || !content || !category) {
      return res.status(400).json({ message: 'Title, content, and category are required' });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const newPost = new Post({
      title,
      content,
      category,
      author: req.user._id,
      slug,
    });

    await newPost.save();

    console.log('Post saved:', newPost);

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error in createPost:', error);
    next(error);
  }
};

// Update a post

exports.updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { title, content, category } = req.body;

    // Find post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the logged-in user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    // Update fields
    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;

    // Optionally update slug if title changes
    if (title) {
      const slugify = require('slugify');
      post.slug = slugify(title, { lower: true, strict: true });
    }

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// Delete a post by ID
exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the logged-in user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

        await post.remove();
    
        res.status(200).json({ message: 'Post deleted successfully' });
      } catch (error) {
        next(error);
      }
    };

// Get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author', '_id name');
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// Get a post by ID
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
