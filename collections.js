// ==========================================
// COLLECTION 1: users
// Stores all people in the system: clients,
// technicians, and dispatchers.
// Role-specific fields are null when unused.
// ==========================================

// Example 1: A Technician
{
  "_id": ObjectId("64a1f2c3e4b5d6789012abcd"),
  "name": "John Doe",
  "email": "john.doe@fieldflow.com",
  "phone": "949-237-8487",
  "role": "technician",       // "client", "technician", or "dispatcher"
  "address": "14 Bellini, Irvine, CA 92607",
  "isAvailable": true,        // true = available for new jobs; only used for technicians
  "department": null,         // only used for dispatchers
  "region": {                 // embedded — region the user belongs to
    "regionName": "Irvine",
    "city": "Irvine",
    "state": "CA"
  },
  "skills": [                 // embedded array — only used for technicians
    { "skillName": "HVAC", "category": "Mechanical" },
    { "skillName": "Electrical", "category": "Electrical" }
  ]
}

// Example 3: A Dispatcher
{
  "_id": ObjectId("64a1f2c3e4b5d6789012cc22"),
  "name": "Diana Park",
  "email": "diana.park@fieldflow.com",
  "phone": "503-555-0284",
  "role": "dispatcher",
  "address": "200 NW 5th Ave, Portland, OR 97209",
  "isAvailable": null,        // not applicable for dispatchers
  "department": "West Coast Operations", // only used for dispatchers
  "region": {
    "regionName": "Portland North",
    "city": "Portland",
    "state": "OR"
  },
  "skills": []                // empty for dispatchers
}

// Example 2: A Client
{
  "_id": ObjectId("64a1f2c3e4b5d6789012ef01"),
  "name": "Ryan Kim",
  "email": "ryan.kim@example.com",
  "phone": "949-264-5731",
  "role": "client",
  "address": "88 Market St, San Francisco, CA 94105",
  "isAvailable": null,        // not applicable for clients
  "department": null,         // not applicable for clients
  "region": {
    "regionName": "San Francisco",
    "city": "San Francisco",
    "state": "CA"
  },
  "skills": []                // empty for clients
}

// ==========================================
// COLLECTION 2: jobs
// Stores all work orders in the system.
// Reviews are embedded since they belong
// exclusively to one job.
// Clients, technicians, and dispatchers are
// referenced by _id from the users collection.
// ==========================================

// Example 1: A completed job with a review
{
  "_id": ObjectId("64b2e3d4f5a6c7890123bcde"),
  "description": "HVAC unit repair on 3rd floor",
  "status": "Completed",      // "Pending", "Assigned", "In Progress", "Completed"
  "scheduledDate": "2025-03-10",
  "completedDate": "2025-03-10",
  "priority": "High",         // "Low", "Medium", "High"
  "clientId": ObjectId("64a1f2c3e4b5d6789012ef01"),      // ref → users
  "technicianId": ObjectId("64a1f2c3e4b5d6789012abcd"),  // ref → users
  "dispatcherId": ObjectId("64a1f2c3e4b5d678901200ff"),  // ref → users
  "reviews": [                // embedded array — reviews belong only to this job
    {
      "rating": 5,            // integer 1–5
      "comment": "Technician was on time and very professional.",
      "reviewDate": "2025-03-11"
    }
  ]
}

// Example 2: A pending job (not yet assigned)
{
  "_id": ObjectId("64b2e3d4f5a6c7890123ffff"),
  "description": "Plumbing leak under kitchen sink",
  "status": "Pending",
  "scheduledDate": "2025-04-01",
  "completedDate": null,      // null until job is completed
  "priority": "Medium",
  "clientId": ObjectId("64a1f2c3e4b5d6789012ef01"),
  "technicianId": null,       // null until a technician is assigned
  "dispatcherId": null,       // null until a dispatcher assigns the job
  "reviews": []               // empty until job is completed
}
