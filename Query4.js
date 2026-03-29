// Query4.js
// Update: Toggle isAvailable status for a specific technician
// Finds Marcus Rivera and flips his isAvailable boolean

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db("fieldflow");
    const users = db.collection("users");

    // First check current status
    const before = await users.findOne({ "name": "Marcus Rivera" });
    console.log("Before update - isAvailable:", before.isAvailable);

    // Flip the boolean
    await users.updateOne(
      { "name": "Marcus Rivera" },
      [{ "$set": { "isAvailable": { "$not": "$isAvailable" } } }]
    );

    // Check new status
    const after = await users.findOne({ "name": "Marcus Rivera" });
    console.log("After update - isAvailable:", after.isAvailable);

  } finally {
    await client.close();
  }
}

main();