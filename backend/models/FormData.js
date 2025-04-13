const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const FormData = mongoose.model('users', FormDataSchema);

module.exports = FormData;