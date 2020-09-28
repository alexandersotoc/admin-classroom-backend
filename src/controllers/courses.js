const Course = require('../models').Course;

const { responseToSequelizeError } = require('../utils/responses');

function getAllCourses(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 20;
    Course.findAndCountAll({
            limit: limit,
            offset: offset    
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            responseToSequelizeError(res, err);
        });    
}

function createCourse(req, res) {
    const { name, description } = req.body;
    Course.create({
            name: name,
            description: description
        })
        .then(result => {
            res.status(201).json({
                message: 'Course created'
            });
        })
        .catch(err => {
            responseToSequelizeError(res, err);
        });    
}

function updateCourse(req, res) {
    const courseId = req.params.courseId;
    const { name, description } = req.body;
    Course.findOne({
            where: { course_id: courseId }
        })
        .then(course => {
            console.log({ course });
            if (!course) {
                return res.status(400).json({
                    message: 'Course was not found'
                });
            }
            course.name = name || course.name;
            course.description = description || course.description;
            course.save().then(result => {
                return res.status(200).json({
                    message: 'Course was updated'
                });
            })
            .catch(err => {
                responseToSequelizeError(res, err);
            })
        })
        .catch(err => {
            responseToSequelizeError(res, err);
        });    
}

module.exports = {
    getAllCourses, 
    createCourse,
    updateCourse
}