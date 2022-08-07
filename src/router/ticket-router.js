let express = require('express');
let router = new express.Router();
let ticket = require('../controllers/ticket');
let auth = require('../middleware/auth/auth');

router.get('/tickets/all', auth.authenticateUser, ticket.getTickets);
router.get('/tickets', auth.authenticateUser, ticket.getTickets);
router.post('/tickets/new', auth.authenticateUser, ticket.createTicket);
router.post('/tickets/markAsClosed', auth.authenticateUser, ticket.closeTicket);
router.post('/tickets/delete', auth.authenticateUser, ticket.deleteTicket);


module.exports = router