'use strict'

const Promise = require('bluebird');
const _ = require('lodash');
const models = require('../model/models');
const bcrypt = require('bcrypt');


let userDataValidation = async function (params) {
    let username = _.get(params, 'username', '');
    let role = _.get(params, 'role', '');

    if (_.isEmpty(username)) {
        throw new Error('Username cant be empty');
    }
    if (_.isEmpty(role)) {
        throw new Error('Role cant be empty');
    }

    try {
        let userData = await checkUserAlreadyExist(username);
        if (!_.isEmpty(userData)) {
            throw new Error(`User Already Exist with username ${username}!`);
        }
    }
    catch (e) {
        console.log('error :::: ', e);
        return Promise.reject(e);
    }
    let userBody = {
        username,
        role
    }
    return userBody;
};

let checkUserAlreadyExist = async function (id) {
    let User = models.getModel('users');
    let query = {
        username: id
    }
    try {
        let userData = await User.findOne(query).lean();
        return Promise.resolve(userData);
    }
    catch (e) {
        console.log('error while fetching user data');
        return Promise.reject('Error while fetching user data ', e);
    }
}

let checkUserAlreadyExistWithEmail = async function (email) {
    let User = models.getModel('users');
    let query = {
        email: email
    }
    try {
        let userData = await User.findOne(query).lean();
        if (!userData) {
            throw new Error('Invalid Credentials');
        }
        return Promise.resolve(userData);
    }
    catch (e) {
        console.error('error while fetching user data', e);
        return Promise.reject(e);
    }

}

let findByCredentials = async function(email, password){
    let User = models.getModel('users');
    let query = {
        email: email
    }
    try{
        let user = await User.findOne(query).lean();
        if (!user) {
            throw new Error('Invalid Credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw new Error('Invalid Credentials');
        }
        return Promise.resolve(user);
    }
    catch (e) {
        console.error('Error while fetching user data', e);
        return Promise.reject(e);
    }

}

module.exports = {
    userDataValidation,
    checkUserAlreadyExist,
    checkUserAlreadyExistWithEmail,
    findByCredentials
}