import {
  getFirestore,
  query,
  doc,
  getDoc,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { app } from "./init";
// import { updateDoc } from "firebase/firestore/lite";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function retrieveDataByField(
  collectionName: string,
  field: string,
  value: string
) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function addData(
  collectionName: string,
  data: any,
  callback: (result: any) => void
) {
  await addDoc(collection(firestore, collectionName), data)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
      console.log(error);
    });
}

export async function updateData(
  collectionName: string,
  id: string,
  data: any,
  callback: (result: any) => void
) {
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function deleteData(
  collectionName: string,
  id: string,
  callback: (result: any) => void
) {
  const docRef = doc(firestore, collectionName, id);
  await deleteDoc(docRef)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}
