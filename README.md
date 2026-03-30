# CS3200 FieldFlow Project 2 — MongoDB Database

FieldFlow is a database system that manages field technician dispatch, job tracking, and client feedback. This project migrates the relational database from Project 1 into a MongoDB document database.

---
## Walkthrough Video
[Click here to watch] https://drive.google.com/file/d/1X4fiUNXicTmGyLrRuxISeb6lKP0Xm7jW/view?usp=sharing
## Main Tables
[View hierarchical tables on Lucidchart. Please disregard extra graps on the left. I reached the maximum of 3 uploads on Lucidchart.](https://lucid.app/lucidchart/bdeddc4a-af88-4875-9130-48e434477465/edit?viewport_loc=1961%2C-535%2C809%2C1374%2C0_0&invitationId=inv_2c719068-2abe-4d44-81ea-753d960d72d4)

## Collections

### `users`
Stores all people in the system: clients, technicians, and dispatchers. Role-specific fields are `null` when not applicable.

### `jobs`
Stores all work orders. Reviews are embedded inside each job document. Clients, technicians, and dispatchers are referenced by name from the `users` collection.

---

## Setup Instructions

### Prerequisites
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (v8.2+)
- [Node.js](https://nodejs.org) (v18+)
- [Mongo Compass](https://www.mongodb.com/products/compass) (optional, for visual inspection)

### 1. Start MongoDB
```
brew services start mongodb-community
```

### 2. Install dependencies
```
npm install
```

### 3. Import the data
```
mongoimport --db fieldflow --collection users --file users.json
mongoimport --db fieldflow --collection jobs --file jobs.json
```

---

## Running the Queries

| File | Description |
|---|---|
| `Query1.js` | Aggregation pipeline — average rating per technician |
| `Query2.js` | Complex search — jobs that are High priority OR Pending |
| `Query3.js` | Count — total jobs for a specific client (Janet Cho) |
| `Query4.js` | Update — toggle technician availability on/off |
| `Query5.js` | Filter — completed jobs with a review rating above 4 |

Run any query with:
```
node Query1.js
node Query2.js
node Query3.js
node Query4.js
node Query5.js
```

---

## Sample Query Outputs

### Query 1 — Average Rating Per Technician
```
[
  { "_id": "Marcus Rivera", "avgRating": 5, "totalReviews": 1 },
  { "_id": "Kevin Nguyen", "avgRating": 5, "totalReviews": 1 },
  { "_id": "James Okafor", "avgRating": 4, "totalReviews": 1 },
  { "_id": "Sofia Hernandez", "avgRating": 4, "totalReviews": 2 }
]
```

### Query 2 — High Priority OR Pending Jobs
Returns 6 jobs that are either High priority or have Pending status.

### Query 3 — Count Jobs for Janet Cho
```
[{ "totalJobs": 3 }]
```

### Query 4 — Toggle Technician Availability
```
Before update - isAvailable: true
After update - isAvailable: false
```

### Query 5 — Completed Jobs with Rating Above 4
Returns 3 completed jobs where the review rating is greater than 4.

---

## AI Assistance Disclosure
This project used Claude Sonnet 4.6 (Anthropic) to assist with writing this README and generating test data. It also assisted with the order of aggregation pipeline queries. All queries were tested and verified by the author using Mongo Compass and Node.js.
Prompts:
1. "Generate 10 test documents for a MongoDB users collection for a field service app called FieldFlow. Users can have one of three roles: client, technician, or dispatcher. Technicians should have an embedded region object and a skills array. Role-specific fields should be null when not applicable."
2. "Help me understand the correct order of stages in a MongoDB aggregation pipeline for a jobs collection where reviews are embedded as an array. I want to first unwind the reviews, then group by technicianName to calculate average rating, then sort by highest rating first."
3. "What should a MongoDB collection definition document look like for a field service app called FieldFlow? I have two collections: users (storing clients, technicians, and dispatchers) and jobs (storing work orders with embedded reviews). Provide JSON examples with comments explaining each field, including how to handle null fields for role-specific attributes."
