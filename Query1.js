// Query1.js
// Aggregation Pipeline: Average rating per technician
// Unwinds the reviews array, groups by technicianName,
// calculates average rating and total reviews, sorted highest first

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db("fieldflow");
    const jobs = db.collection("jobs");

    const result = await jobs.aggregate([
      {
        '$unwind': {
          'path': '$reviews',
          'preserveNullAndEmptyArrays': false
        }
      },
      {
        '$group': {
          '_id': '$technicianName',
          'avgRating': { '$avg': '$reviews.rating' },
          'totalReviews': { '$sum': 1 }
        }
      },
      {
        '$sort': { 'avgRating': -1 }
      }
    ]).toArray();

    console.log("Average Rating Per Technician:");
    console.log(JSON.stringify(result, null, 2));

  } finally {
    await client.close();
  }
}

main();
