require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Incident = require('./models/Incident');

const sampleIncidents = [
    {
        title: 'AI Hallucination in Medical Diagnosis',
        description: 'AI system provided incorrect medical diagnosis due to hallucination of non-existent symptoms, potentially endangering patient health.',
        severity: 'High',
        reported_at: new Date('2023-07-15')
    },
    {
        title: 'Biased Responses in Hiring Assistant',
        description: 'AI hiring assistant showed gender bias in screening candidates for technical positions, favoring male applicants over equally qualified females.',
        severity: 'Medium',
        reported_at: new Date('2023-08-02')
    },
    {
        title: 'Privacy Leak in Conversation Agent',
        description: 'AI conversation agent inadvertently revealed user information from prior conversations to unrelated users.',
        severity: 'High',
        reported_at: new Date('2023-09-10')
    },
    {
        title: 'Harmful Content Generation',
        description: 'AI content generator produced potentially harmful instructions when given ambiguous prompts.',
        severity: 'Medium',
        reported_at: new Date('2023-10-05')
    },
    {
        title: 'Recommendation System Filter Bubble',
        description: 'AI recommendation system created extreme filter bubbles, reinforcing polarizing content consumption.',
        severity: 'Low',
        reported_at: new Date('2023-11-12')
    }
];

// Database seeding function
const seedDatabase = async () => {
    try {
        // Connect to MongoDB using the module
        await connectDB();
        console.log('Connected to MongoDB for seeding');

        // Clear existing incidents
        await Incident.deleteMany({});
        console.log('Cleared existing incidents');

        // Insert sample incidents
        const insertedIncidents = await Incident.insertMany(sampleIncidents);
        console.log(`${insertedIncidents.length} sample incidents inserted`);

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Database seeding completed');
        
        // Exit process
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seeding function
seedDatabase(); 