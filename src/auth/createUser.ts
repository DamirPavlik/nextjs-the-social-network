import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export async function createUser(
  email: string,
  password: string,
  username: string
) {
  const res = await createUserWithEmailAndPassword(auth, email, password);

  if (!res) {
    throw new Error("Failed to create user.");
  }

  const user = auth.currentUser;
  if (!user) {
    throw new Error("User authentication error.");
  }

  await updateProfile(user, { displayName: username });

  // Adding username to Firestore
  await addDoc(collection(db, "usernames"), { username });

  return user;
}
