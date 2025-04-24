const { body } = require('express-validator');

// Validation middleware for incident creation/update
exports.validateIncident = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('severity')
        .notEmpty().withMessage('Severity is required')
        .isIn(['Low', 'Medium', 'High']).withMessage('Severity must be Low, Medium, or High')
]; 