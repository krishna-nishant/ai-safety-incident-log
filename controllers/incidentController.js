const { validationResult } = require('express-validator');
const Incident = require('../models/Incident');

const getIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find().sort({ reported_at: -1 });
        res.status(200).json(incidents);
    } catch (error) {
        console.error('Error fetching incidents:', error);
        res.status(500).json({ message: 'Failed to fetch incidents' });
    }
};

const createIncident = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    try {
        const { title, description, severity } = req.body;
        const newIncident = new Incident({ title, description, severity });

        const savedIncident = await newIncident.save();
        res.status(201).json(savedIncident);
    } catch (error) {
        console.error('Error creating incident:', error);
        res.status(500).json({ message: 'Failed to create incident' });
    }
};

const getIncidentById = async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);

        if (!incident) {
            return res.status(404).json({ message: 'Incident not found' });
        }

        res.status(200).json(incident);
    } catch (error) {
        console.error('Error fetching incident:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Incident not found' });
        }
        res.status(500).json({ message: 'Failed to fetch incident' });
    }
};

const deleteIncident = async (req, res) => {
    try {
        const incident = await Incident.findByIdAndDelete(req.params.id);

        if (!incident) {
            return res.status(404).json({ message: 'Incident not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting incident:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Incident not found' });
        }
        res.status(500).json({ message: 'Failed to delete incident' });
    }
};

module.exports = {
    getIncidents,
    createIncident,
    getIncidentById,
    deleteIncident
};
