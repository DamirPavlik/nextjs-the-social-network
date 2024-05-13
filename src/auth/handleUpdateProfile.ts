import { auth, db } from "@/firebase/config";
import { updateEmail, updateProfile } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

export async function handleUpdateProfile(formData: FormData) {
  const currentUser = auth.currentUser;
  const user = {
    email: String(formData.get("email")),
    username: String(formData.get("username")),
  };
  if (currentUser) {
    if (user.username !== "") {
      const usernameCollection = await getDocs(collection(db, "usernames"));
      const allUsernames = usernameCollection.docs.map((doc) => ({
        username: doc.data().username,
      }));
      allUsernames.map((item) => {
        if (item.username === user.username) {
          throw new Error("Username already exists");
        }
      });
      updateProfile(currentUser, {
        displayName: user.username,
      });
    }
    if (user.email !== "") {
      updateEmail(currentUser, user.email);
    }
  }
}
