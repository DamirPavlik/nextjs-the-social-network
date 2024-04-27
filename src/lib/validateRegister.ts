import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

export async function validateRegister(
  formData: FormData
): Promise<boolean | { [key: string]: string }> {
  const user = {
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    username: String(formData.get("username")),
  };
  const usernameCollection = await getDocs(collection(db, "usernames"));
  const allUsernames = usernameCollection.docs.map((doc) => ({
    username: doc.data().username,
  }));

  const errors: { [key: string]: string } = {};
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (user.email === "") {
    errors["email"] = "Email is empty";
  } else if (!emailRegex.test(user.email)) {
    errors["email"] = "Invalid email";
  }

  if (user.password.length < 6) {
    errors["password"] = "Password must be atleast 8 characters long";
  } else if (user.password.length > 24) {
    errors["password"] = "Password is too long, maximum characters is 24";
  }

  if (user.username === "") {
    errors["username"] = "Username is empty";
  }

  allUsernames.map((item) => {
    if (item.username === user.username) {
      errors["username"] = "Username already exists";
    }
  });

  if (Object.keys(errors).length > 0) {
    return errors;
  } else {
    return true;
  }
}
