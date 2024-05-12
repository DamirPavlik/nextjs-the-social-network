import { auth, db } from "@/firebase/config";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { logout } from "./logout";
import { redirect } from "next/navigation";
import { deleteUser } from "firebase/auth";

export async function removeUser() {
  const q = query(
    collection(db, "usernames"),
    where("username", "==", auth.currentUser?.displayName)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    querySnapshot.forEach(async (doc) => {
      const docRef = doc.ref;
      await deleteDoc(docRef);
      console.log(`Deleted document with ID: ${docRef.id}`);
    });
  } else {
    console.log("No document found with the specified username");
  }

  deleteUser(auth.currentUser!);
  await logout();
  redirect("/register");
}
