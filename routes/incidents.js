const express = require('express');
const router = express.Router();
const { validateIncident } = require('../middleware/validator');
const {
    getIncidents,
    createIncident,
    getIncidentById,
    deleteIncident
} = require('../controllers/incidentController');

// GET all incidents
router.get('/', getIncidents);

// POST new incident
router.post('/', validateIncident, createIncident);

// GET specific incident by ID
router.get('/:id', getIncidentById);

// DELETE specific incident by ID
router.delete('/:id', deleteIncident);

module.exports = router; 