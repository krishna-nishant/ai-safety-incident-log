# HumanChain AI Safety Incident Log API

Hey there! 👋 This is a simple API I built for logging AI safety incidents for HumanChain. It's not too fancy, but it gets the job done.

## Language/Framework Choice

- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM

## Features

- Log new AI safety incidents with title, description, and severity level
- Retrieve all incidents or specific incidents by ID
- Delete incidents
- Data persistence with MongoDB
- Input validation for required fields and severity levels
- Error handling

## Project Structure

```
ai-safety-incident-log/
├── config/
│   └── db.js
├── controllers/
│   └── incidentController.js
├── middleware/
│   └── validator.js
├── models/
│   └── Incident.js
├── routes/
│   └── incidents.js
├── .env
├── package.json
├── README.md
├── seed.js
└── server.js
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/krishna-nishant/ai-safety-incident-log.git
cd ai-safety-incident-log
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ai-safety-incidents
```

Adjust the MONGODB_URI as needed for your MongoDB setup.

### 4. Start MongoDB

You probably know how to do this 🫠

### 5. Seed the Database with Sample Incidents

Populate the database with sample incident data:

```bash
node seed.js
```

This will add 5 sample AI safety incidents to your database.

### 6. Start the Server

```bash
# For development (with auto-reload)
npm run dev

# For production
npm start
```

The server will start on port 3000 (or the port specified in your .env file).

## API Endpoints

### 1. GET /incidents

Retrieves all incidents currently stored in the database.

**Example Request:**

```bash
curl -X GET http://localhost:3000/incidents
```

**Response:** (200 OK)

```json
[
  {
    "id": "60f8a9b3c41c121b5e8b4567",
    "title": "AI Hallucination in Medical Diagnosis",
    "description": "AI system provided incorrect medical diagnosis...",
    "severity": "High",
    "reported_at": "2023-07-15T00:00:00.000Z"
  },
  {
    "id": "60f8a9b3c41c121b5e8b4568",
    "title": "Biased Responses in Hiring Assistant",
    "description": "AI hiring assistant showed gender bias in screening candidates...",
    "severity": "Medium",
    "reported_at": "2023-08-02T00:00:00.000Z"
  }
]
```

### 2. POST /incidents

Log a new incident to the database.

**Example Request:**

```bash
curl -X POST http://localhost:3000/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Unintended Algorithm Behavior",
    "description": "Recommendation system promoting harmful content",
    "severity": "Medium"
  }'
```

**Response:** (201 Created)

```json
{
  "id": "60f8a9b3c41c121b5e8b4569",
  "title": "Unintended Algorithm Behavior",
  "description": "Recommendation system promoting harmful content",
  "severity": "Medium",
  "reported_at": "2023-11-25T12:34:56.789Z"
}
```

### 3. GET /incidents/{id}

Retrieve a specific incident by its ID.

**Example Request:**

```bash
curl -X GET http://localhost:3000/incidents/60f8a9b3c41c121b5e8b4567
```

**Response:** (200 OK)

```json
{
  "id": "60f8a9b3c41c121b5e8b4567",
  "title": "AI Hallucination in Medical Diagnosis",
  "description": "AI system provided incorrect medical diagnosis...",
  "severity": "High",
  "reported_at": "2023-07-15T00:00:00.000Z"
}
```

### 4. DELETE /incidents/{id}

Delete the incident with the specified ID.

**Example Request:**

```bash
curl -X DELETE http://localhost:3000/incidents/60f8a9b3c41c121b5e8b4567
```

This one doesn't return any data, just a 204 status code if it worked.

## Error Stuff

The API will throw the usual errors when things go wrong:

- 400 if you messed up the request (missing fields, wrong severity level)
- 404 if the incident doesn't exist
- And the dreaded 500 if something explodes on the server

## Testing with Postman

I included a Postman collection to make testing easier. Just import the `HumanChain-AI-Safety-Incidents.postman_collection.json` file into Postman.

### Importing the Collection

1. Open Postman
2. Click on "Import" button in the top left
3. Select the `HumanChain-AI-Safety-Incidents.postman_collection.json` file
4. Click "Import"

### Using the Collection

1. The collection uses a variable `{{baseUrl}}` set to `http://localhost:3000` by default
2. To test endpoints that require an incident ID:
   - First create a new incident or get all incidents
   - Copy an incident ID from the response
   - Set the `{{incidentId}}` variable in the collection by clicking on the collection name → Variables → Current Value

### Available Requests

1. **GET /incidents**: Retrieves all incidents
2. **POST /incidents**: Creates a new incident
3. **GET /incidents/{id}**: Retrieves a specific incident by ID
4. **DELETE /incidents/{id}**: Deletes a specific incident by ID

## Design Decisions and Challenges

- Used MongoDB for its flexibility with document storage and ease of integration with Node.js
- Implemented MVC architecture to separate concerns and improve maintainability
- Added validation middleware to ensure data integrity and proper error responses
- Created a seeding script to easily populate the database with sample data
- Used environment variables for configuration to make deployment more flexible
