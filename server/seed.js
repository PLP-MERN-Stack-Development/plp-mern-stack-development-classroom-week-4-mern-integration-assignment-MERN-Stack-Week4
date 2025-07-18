import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from './models/Post.js';
import Category from './models/Category.js';
import User from './models/User.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Clear existing data
const clearData = async () => {
  await Post.deleteMany({});
  await Category.deleteMany({});
  await User.deleteMany({});
  console.log('Existing data cleared');
};

// Create sample data
const seedData = async () => {
  try {
    await clearData();

    // Create sample user
    const user = new User({
      username: 'blogger',
      email: 'blogger@example.com',
      password: 'password123',
      role: 'admin'
    });
    await user.save();

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Technology', description: 'Latest in tech world' },
      { name: 'Travel', description: 'Travel guides and tips' },
      { name: 'Food', description: 'Culinary adventures' },
      { name: 'Lifestyle', description: 'Daily life and habits' }
    ]);

    // Sample blog posts
    const posts = [
      {
        title: 'Getting Started with React Hooks',
        content: 'React Hooks revolutionized how we write components...',
        category: categories[0]._id,
        author: user._id,
        featuredImage: '/uploads/tech1.jpg'
      },
      {
        title: 'My Journey Through Bali',
        content: 'The island of gods offered me incredible experiences...',
        category: categories[1]._id,
        author: user._id,
        featuredImage: '/uploads/travel1.jpg'
      },
      {
        title: '10 Must-Try Italian Dishes',
        content: 'Italian cuisine is more than just pizza and pasta...',
        category: categories[2]._id,
        author: user._id,
        featuredImage: '/uploads/food1.jpg'
      },
      {
        title: 'The Future of AI in Healthcare',
        content: 'Artificial intelligence is transforming medicine...',
        category: categories[0]._id,
        author: user._id,
        featuredImage: '/uploads/tech2.jpg'
      },
      {
        title: 'Minimalist Living: Less is More',
        content: 'How reducing possessions increased my happiness...',
        category: categories[3]._id,
        author: user._id,
        featuredImage: '/uploads/lifestyle1.jpg'
      },
      {
        title: 'Hidden Gems of Portugal',
        content: 'Beyond Lisbon and Porto, these places will amaze you...',
        category: categories[1]._id,
        author: user._id,
        featuredImage: '/uploads/travel2.jpg'
      }
    ];

    await Post.insertMany(posts);
    console.log('Sample data created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();