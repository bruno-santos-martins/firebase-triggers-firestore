import * as admin from "firebase-admin";
import type { Record } from "../interfaces/record";

var serviceAccount = require("../../key.json");

class FirestoreService {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
    this.db = admin.firestore();
  }

  async createRecord(
    collection: string,
    data: { name: string },
  ): Promise<Record> {
    let name = data.name;
    let counter = 1;

    while (true) {
      const existingRecordRef = this.db
        .collection(collection)
        .where("name", "==", name)
        .limit(1);

      const existingSnapshot = await existingRecordRef.get();

      if (existingSnapshot.empty) {
        break;
      }

      name = `${data.name}_${counter}`;
      counter++;
    }

    const incrementIdRef = this.db
      .collection(collection)
      .orderBy("increment_id", "desc")
      .limit(1);

    return this.db.runTransaction(async transaction => {
      const snapshot = await transaction.get(incrementIdRef);
      let newId = 1;

      if (!snapshot.empty) {
        const lastRecord = snapshot.docs[0].data();
        newId = lastRecord.increment_id + 1;
      }

      const newRecord = {
        ...data,
        name,
        increment_id: newId,
      };

      const docRef = this.db.collection(collection).doc();
      transaction.set(docRef, newRecord);

      return { id: docRef.id, ...newRecord };
    });
  }

  async getRecordsByName(collection: string, name: string): Promise<Record[]> {
    const snapshot = await this.db
      .collection(collection)
      .where("name", "==", name)
      .get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Record[];
  }

  async getLastIncrementId(collection: string): Promise<number> {
    const snapshot = await this.db
      .collection(collection)
      .orderBy("increment_id", "desc")
      .limit(1)
      .get();

    if (snapshot.empty) {
      return 0;
    }

    const doc = snapshot.docs[0].data() as Record;
    return doc.increment_id;
  }
}

const firestoreServiceInstance = new FirestoreService();
export default firestoreServiceInstance;
