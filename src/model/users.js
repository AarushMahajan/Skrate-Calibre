const mongoose = require('mongoose');
const validator = require('validator');
const Schema = require('mongoose').Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: Array,
        required: true,
        trim: true
    }

}, { strict: false, timestamps: true });

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

module.exports = userSchema