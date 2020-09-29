const { User, Course, Classroom, ClassroomStudents } = require('../models');

const { responseToSequelizeError } = require('../utils/responses');

function getAllClassrooms(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 20;
    Classroom.findAndCountAll({
            limit: limit,
            offset: offset,
            include: [
                {
                    model: User,
                    as: 'teacher',
                    attributes: { exclude: ['password'] }   
                },
                {
                    model: Course,
                    as: 'course'
                }
            ],
            attributes: { exclude: ['teacher_id', 'course_id'] }   
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            responseToSequelizeError(res, err);
        }); 
}

function createClassroom(req, res) {
    const { name, start_date, teacher_id, course_id } = req.body;
    Classroom.create({
            name: name,
            start_date: start_date,
            teacher_id: teacher_id, 
            course_id: course_id
        })
        .then(result => {
            res.status(201).json({
                message: 'Classroom created'
            });
        })
        .catch(err => {
            responseToSequelizeError(res, err);
        });
}

function getStudents(req, res) {
    const classroomId = req.params.classroomId;
    Classroom.findOne({
        where: {
            classroom_id: classroomId 
        },
        include: [
            {
                model: User,
                as: 'students',
                through: { attributes: [] },
                attributes: { exclude: ['password'] }   
            },
        ],
        attributes: { exclude: ['teacher_id', 'course_id'] }   
    })
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        responseToSequelizeError(res, err);
    }); 
}

function addStudent(req, res) {
    const classroomId = req.params.classroomId;
    const userId = req.body.user_id;
    ClassroomStudents.create({
        user_id: userId,
        classroom_id: classroomId
    })
    .then(result => {
        res.status(201).json({
            message: 'Student added to classroom'
        });
    })
    .catch(err => {
        responseToSequelizeError(res, err);
    });
}

function removeStudent(req, res) {

}

module.exports = {
    getAllClassrooms,
    createClassroom,
    getStudents,
    addStudent,
    removeStudent
}