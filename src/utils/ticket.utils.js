'use strict'

const _ = require('lodash');

let ticketValidation = async function (params, res) {
    const title = _.get(params, 'title');
    const description = _.get(params, 'description');

    try{
        if (_.isEmpty(title)) {
            throw new Error('Title cant be empty');
        }
    
        if (_.isEmpty(description)) {
            throw new Error('Description cant be empty');
        }
    
        if(!_.includes(params.role, 'admin')) {
            throw new Error('Only Admin can create tickets');
        }
        delete params.role;
    }
    catch (e) {
        console.log('error :::: ', e);
        return Promise.reject(e);
    }

    
};

module.exports = {
    ticketValidation
}