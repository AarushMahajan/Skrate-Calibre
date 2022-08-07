let express = require('express');
let router = new express.Router();
let users = require('../controllers/users');

router.post('/user/new', users.createUser);

module.exports = router