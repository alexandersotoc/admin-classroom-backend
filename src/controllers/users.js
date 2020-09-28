const bcrypt = require('bcryptjs');

const User = require('../models').User;

const { responseToSequelizeError } = require('../utils/responses');

function getAllUsers(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 20;
    User.findAndCountAll({
            limit: limit,
            offset: offset, 
            attributes: { exclude: ['password'] }   
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            responseToSequelizeError(res, err);
        });
}

function createUser(req, res) {
    const body = req.body;
    User.count({
            where: { email: body.email } 
        })
        .then(result => {
            if (result > 0) {
                return res.status(409).json({
                    message: 'User has already been created'
                });
            }
            User.create({
                    email: body.email,
                    password: bcrypt.hashSync(body.password, 10),
                    first_name: body.first_name,
                    last_name: body.last_name,
                    phone_number: body.phone_number,
                    type_of_account: body.type_of_account
                })
                .then(result => {
                    res.status(201).json({
                        message: 'User created'
                    });
                })
                .catch(err => {
                    responseToSequelizeError(res, err);
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