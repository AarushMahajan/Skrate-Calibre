'use strict'

const jwt = require('jsonwebtoken');
const models = require('../../model/models');
const userUtil = require('../../utils/user.utils');
const _ = require('lodash');

let createJwtAuthToken = function (user) {
    const token = jwt.sign({ user }, 'opCodeWrittenByMe');
    return token;
}

let authenticateUser = async function (req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        
        const decode = jwt.verify(token, 'opCodeWrittenByMe');
        let User = models.getModel('users');
        let query = {
            username: decode.user.username
        };
        let user = await User.findOne(query).lean();
        if (!user) {
            throw new Error();
        }
        _.set(req, 'session.user', user);
        // _.set(req, 'session.token', token);
        next();
    }
    catch (e) {
        res.status(401).send('Unauthorised!');
    }
}

module.exports = {
    createJwtAuthToken,
    authenticateUser
}