'use strict'

const _ = require('lodash');
const models = require('../model/models');
const uuid = require('uuid');
const ticketUtils = require('../utils/ticket.utils')

let getTickets = async function (req, res) {
    let Ticket = models.getModel('ticket');
    const paramStatus = req.query.status || '';
    const paramTitle = req.query.title || ''
    const paramPriority = req.query.priority || '';
    const username = req.session.user.username;

    const query = {
        assignedTo: username
    }

    if (paramStatus) {
        query['status'] = paramStatus
    }

    if (paramTitle) {
        query['title'] = paramTitle
    }

    if (paramPriority) {
        query['priority'] = paramPriority
    }


    try {
        let tickets = await Ticket.find(query).lean();
        res.status(200).send({ results: tickets });
    }
    catch (e) {
        console.error('Error while get post', e);
        res.status(501).send('Error while get post');
    }
}

let createTicket = async function (req, res, next) {
    let params = {
        id: uuid.v4(),
        title: req.body.title,
        description: req.body.description,
        status: 'open',
        priority: 'low',
        assignedTo: req.session.user.username,
        role: req.session.user.role
    }

    try {
        await ticketUtils.ticketValidation(params);
        let Ticket = models.getModel('ticket', params);
        await Ticket.save();
        res.status(201).json({
            message: 'Ticket Created Successfully',
            id: params.id
        });
    }
    catch (e) {
        console.error("error", e);
        res.send(e.message);
    }
}

let closeTicket = async function (req, res) {
    const ticketID = req.body.ticketId
    const username = req.session.user.username
    const role = req.session.user.role;
    const Ticket = models.getModel('ticket');

    if(!ticketID) {
        res.status(401).send('Ticket Id is required');
    }

    const query = {
        id: ticketID
    }

    try {
        const ticket = await Ticket.findOne(query);
        if (!ticket) {
            throw new Error('No ticket available');
        }

        if (ticket.assignedTo === username || _.includes(role, 'admin')) {

            if (ticket.assignedTo === username) {
                const ticketPriority = ticket.priority;
                let query1 = {};
                switch (ticketPriority) {
                    case 'low':
                        query1 = {
                            $or: [{ priority: 'medium' }, { priority: 'high' }]
                        }
                        break;
                    case 'medium':
                        query1 = {
                            priority: 'high'
                        }
                        break;
                        case 'high':
                            query1 = {
                                priority: 'high',
                                id: {$ne: ticketID}
                            }
                            break;    
                    default:
                        break;
                }
                query1['assignedTo'] = username;
                const tickets = await Ticket.find(query1);
                if(!_.isEmpty(tickets)) {
                    res.json({
                        message: 'A higher priority task remains to be closed',
                        result: tickets
                    })
                }
                else {
                    await Ticket.findOneAndUpdate({id:ticketID},{status:'close'});
                    res.send('Closed the ticket')
                }
            }
            else {
                await Ticket.deleteOne({ id: ticketID });
            }

        }
        else {
            throw new Error('unauthorised!');
        }

    }
    catch (e) {
        console.log('Error :: ', e);
        res.json({
            error: e.message
        })
    }

}

let deleteTicket = async function(req, res) {
    const ticketID = req.body.ticketId
    const role = req.session.user.role;
    const Ticket = models.getModel('ticket');

    if(!ticketID) {
        res.status(401).send('Ticket Id is required');
    }

    if(!_.includes(role, 'admin')) {
        res.status(401).send('Only Admin can delete');
    }

    await Ticket.remove({id: ticketID});

    res.send('Deleted Successfully');

}


module.exports = {
    createTicket,
    getTickets,
    closeTicket,
    deleteTicket
}