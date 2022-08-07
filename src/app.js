const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./router/user-router');
const ticketRouter = require('./router/ticket-router');
require('./db/mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userRouter);
app.use(ticketRouter);

module.exports = app;