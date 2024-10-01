import firestoreService from "../services/firestoreService";
import * as functions from "firebase-functions";

export const createRecord = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const { name } = req.body;

  if (!name) {
    res.status(400).send("Name is required");
    return;
  }

  try {
    const newRecord = await firestoreService.createRecord("records", { name });
    console.log("Record creation returned on handler:", newRecord);
    res.status(201).send({ id: newRecord.id });
  } catch (error) {
    console.error("Error creating record:", error);
    res.status(500).send("Error creating record");
  }
});
