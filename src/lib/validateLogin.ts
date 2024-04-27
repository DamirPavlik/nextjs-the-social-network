export async function validateLogin(formData: FormData) {
  const errors: { [key: string]: string } = {};
  const user = {
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  };

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

  if (Object.keys(errors).length > 0) {
    return errors;
  } else {
    return true;
  }
}
