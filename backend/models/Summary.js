const mongoose = require('mongoose');

const SummarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    }
});

const Summary = mongoose.model('summaries', SummarySchema);

module.exports = Summary;
