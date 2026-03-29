// Query3.js
// Count documents for a specific user: Janet Cho
// Uses $match to filter jobs by clientName, then $count to total them

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db("fieldflow");
    const jobs = db.collection("jobs");

    const result = await jobs.aggregate([
      { "$match": { "clientName": "Janet Cho" } },
      { "$count": "totalJobs" }
    ]).toArray();

    console.log("Total jobs for Janet Cho:");
    console.log(JSON.stringify(result, null, 2));

  } finally {
    await client.close();
  }
}

main();