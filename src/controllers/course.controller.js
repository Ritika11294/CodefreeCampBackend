const Course = require('../models/course.model');
const express = require('express');
const Router = express.Router();
Router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

module.exports = Router;