import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// Return all classes
router.get("/records", async (req, res) => {
  let collection = await db.collection("classes");
  let result = await collection.find({}).toArray();

  if (!result) res.status(404).send("Error with getting all classes");
  else res.send(result).status(200);

});

// Return specific class based on id
router.get("/:id", async (req, res) => {

  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid ID format" });
  }

  let query = { _id: new ObjectId( req.params.id )};

  let collection = await db.collection("classes");
  let result = await collection.findOne(query);

  if (!result) res.status(404).send(`Error with getting class with id ${req.params.id}`);
  else res.send(result).status(200);
})

// Create new class
router.post("/records", async (req, res) => {
 try {
  let newClass = {
    id: req.body.id,
    class: req.body.class,
  }
  let collection = await db.collection("classes");
  let results = await collection.insertOne(newClass);

  if (!results) res.status(404).send("Could not insert new document");
  else res.send(results).status(204);

 } catch(err){
  console.error(err);
  res.status(500).send("Error adding record");
 }
});

// Delete a class
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }

    const query = { _id: new ObjectId(req.params.id)};

    let collection = await db.collection("classes");
    let result = await collection.deleteOne(query);

    if (result.deletedCount === 1) {
      res.status(200).send({ message: "Class deleted successfully"});
    } else {
      res.status(404).send({ message: "Class not found"});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting a class");
  }
});

export default router;