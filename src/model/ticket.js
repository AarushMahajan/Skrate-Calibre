const Schema = require('mongoose').Schema;

const postSchema = new Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: String,
        required: true,
    }

}, { strict: false, timestamps: true });

module.exports = postSchema