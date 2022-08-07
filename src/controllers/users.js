'use strict'

const _ = require('lodash');
const userUtils = require('../utils/user.utils');
const models = require('../model/models');
const authMiddleWare = require('../middleware/auth/auth');

let getAllUers = async function (req, res) {
    // let User = models.getModel('users');
    // let userData = await User.find({}).limit(50).lean();
    res.status(200).json({ result: req.session.user });
}

let createUser = async function (req, res, next) {
    let params = {
        username: req.body.username,
        role: req.body.role
    }
    try {
        let postData = await userUtils.userDataValidation(params);
        let User = models.getModel('users', postData);
        const token = authMiddleWare.createJwtAuthToken(params);
        await User.save();
        res.status(201).json({
            message: 'User registered successfully',
            token
        });
    }
    catch (e) {
        console.log('error ## ', e);
        res.status(400).json({ error: e.message });
    }
}

let userLogin = async function (req, res) {
    try {
        res.status(200).send({result: req.sessions.user});
    }
    catch (e) {
        return res.status(400).send({error: e.message});
    }
}

let userLogout = async function (req, res){
    let session = models.getModel('session');
    try{
        const userId = req.session.user.userId;
        await session.deleteOne({userId: userId});
        res.send('Logout successfully');
    }
    catch(e){
        console.log('error logout ', e.message);
        res.send('Error while logout');
    }
}

module.exports = {
    getAllUers,
    createUser,
    userLogin,
    userLogout
}