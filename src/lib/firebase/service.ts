import {
  getFirestore,
  query,
  doc,
  getDoc,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { app } from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retriveData(collectionName: string) {
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

export async function signUp(
  userData: {
    email: string;
    fullName: string;
    phone: string;
    password: string;
    role?: string;
  },
  callback: (data: { status: boolean; message: string }) => void
) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    callback({ status: false, message: "User already exists" });
  } else {
    if (!userData.role) {
      userData.role = "member";
    }
    userData.password = bcrypt.hashSync(userData.password, 10);
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({ status: true, message: "User created successfully" });
      })
      .catch((error) => {
        callback({ status: false, message: error.message });
        console.log(error);
      });
  }
}
