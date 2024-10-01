import * as functions from "firebase-functions";

export const onCreateTrigger = functions.firestore.onDocumentCreated(
  "records/{docId}",
  async event => {
    const recordCreated = event.data;
    try {
      console.log(
        `Record creation returned on trigger:`,
        recordCreated?.data(),
      );
    } catch (error) {
      console.error("Error processing trigger:", error);
    }
  },
);
