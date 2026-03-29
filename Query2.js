// Query2.js
// Complex Search: Find all jobs that are either High priority OR Pending status
// Uses $or logical connector to combine two search criteria

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db("fieldflow");
    const jobs = db.collection("jobs");

    const result = await jobs.find({
      "$or": [
        { "priority": "High" },
        { "status": "Pending" }
      ]
    }).toArray();

    console.log("High Priority OR Pending Jobs:");
    console.log(JSON.stringify(result, null, 2));

  } finally {
    await client.close();
  }
}

main();