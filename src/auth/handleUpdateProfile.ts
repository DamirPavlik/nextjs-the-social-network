import { auth } from "@/firebase/config";
import { updateEmail, updateProfile } from "firebase/auth";

export async function handleUpdateProfile(formData: FormData) {
  const currentUser = auth.currentUser;
  const user = {
    email: String(formData.get("email")),
    username: String(formData.get("username")),
  };
  if (currentUser) {
    if (user.username !== "") {
      updateProfile(currentUser, {
        displayName: user.username,
      });
    }
    if (user.email !== "") {
      updateEmail(currentUser, user.email);
    }
  }
}
