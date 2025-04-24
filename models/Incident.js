const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    severity: {
        type: String,
        required: [true, 'Severity is required'],
        enum: {
            values: ['Low', 'Medium', 'High'],
            message: 'Severity must be Low, Medium, or High'
        }
    },
    reported_at: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('Incident', incidentSchema); 