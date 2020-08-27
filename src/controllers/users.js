const User = require('../models').User;

const { responseToSequelizeError } = require('../utils/responses');

function getAllUsers(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 20;
    User.findAndCountAll({
            limit: limit,
            offset: offset    
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            responseToSequelizeError(res, err);
        })
}

function createUser(req, res) {
    const body = req.body;
    User.create({
            email: body.email,
            password: body.password,
            first_name: body.first_name,
            last_name: body.last_name,
            phone_number: body.phone_number
        })
        .then(result => {
            res.status(201).json({
                message: 'User created'
            });
        })
        .catch(err => {
            responseToSequelizeError(res, err);
        });
}

module.exports = {
    getAllUsers,
    createUser
}