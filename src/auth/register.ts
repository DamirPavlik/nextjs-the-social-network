import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function register(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const profilePicture = formData.get("profilePicture");

  createUserWithEmailAndPassword(auth, email, password)
    .then((authUser) => {
      // console.log("registered");
    })
    .catch((error) => {
      console.log(`error registering ${error}`);
    });
}
