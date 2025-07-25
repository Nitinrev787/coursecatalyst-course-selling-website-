const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Course.deleteMany({});
    await Course.insertMany([
      {
        title: 'Python Bootcamp',
        description: 'Learn Python from scratch with hands-on examples.',
        price: 499,
        thumbnail: 'img/course-1.jpg'
      },
      {
        title: 'DSA Masterclass',
        description: 'Master Data Structures and Algorithms for interviews.',
        price: 599,
        thumbnail: 'img/course-2.jpg'
      },
      {
        title: 'Web Dev Pro',
        description: 'Complete full-stack web development course.',
        price: 699,
        thumbnail: 'img/course-3.jpg'
      },
      {
        title: 'SQL Essentials',
        description: 'Learn SQL with practical database exercises.',
        price: 299,
        thumbnail: 'img/course-4.jpg'
      }
    ]);
    console.log('✅ Courses seeded successfully!');
    mongoose.disconnect();
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));