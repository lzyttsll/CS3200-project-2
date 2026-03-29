// Query5.js
// Find all completed jobs that have a review rating above 4
// Uses $match to filter completed jobs, $unwind to flatten reviews,
// then a second $match to filter by rating > 4

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db("fieldflow");
    const jobs = db.collection("jobs");

    const result = await jobs.aggregate([
      { "$match": { "status": "Completed" } },
      { "$unwind": "$reviews" },
      { "$match": { "reviews.rating": { "$gt": 4 } } }
    ]).toArray();

    console.log("Completed jobs with rating above 4:");
    console.log(JSON.stringify(result, null, 2));

  } finally {
    await client.close();
  }
}

main();