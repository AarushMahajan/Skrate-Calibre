const mongoose = require('mongoose');

const url = 'mongodb+srv://aarush:qwertyuiop@cluster0.ti0qmvd.mongodb.net/ticket-manager';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})