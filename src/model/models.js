const mongoose = require('mongoose');
const userSchema = require('./users');
const ticketSchema = require('./ticket');

let getModel = function (modelName, body) {
    switch (modelName) {
        case 'users':
            let User = mongoose.model('users', userSchema);
            return body ? new User(body) : User;
        case 'ticket':
            const Ticket = mongoose.model('ticket', ticketSchema);
            return body ? new Ticket(body) : Ticket;
        default:
    }
};

module.exports = {
    getModel
}