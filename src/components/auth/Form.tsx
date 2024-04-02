import { login } from "@/auth/login";
import { register } from "@/auth/register";
import { authFormProps } from "@/types";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "..";

const Form: React.FC<authFormProps> = ({ isRegister }) => {
  return (
    <section className="h-screen bg-primary-bg flex justify-center items-center text-primary-text">
      <div className="bg-primary-bg-tint border-2 border-border-color w-[650px] px-8 pt-10 pb-8 rounded-md">
        <h2 className="text-center text-3xl text mb-4 font-bold">
          {isRegister ? "Register" : "Log In"}
        </h2>
        <form
          action={async (formData) => {
            "use server";
            if (isRegister) {
              await register(formData);
            } else {
              await login(formData);
            }
            redirect("/");
          }}
          className="mb-8"
        >
          <div className="mb-6">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="bg-primary-bg-tint border-[3px] border-border-color px-3 py-2 rounded-md w-full outline-none"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="bg-primary-bg-tint border-[3px] border-border-color px-3 py-2 rounded-md w-full outline-none"
            />
          </div>
          {isRegister && (
            <div>
              <label htmlFor="profilePicture">Profile Picture</label>
              <input type="file" name="profilePicture" id="profilePicture" />
            </div>
          )}
          <Button
            title="Submit"
            buttonType="submit"
            containerStyles="pt-2 pb-[7px] w-full"
          />
        </form>
        {isRegister ? (
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-blue font-semibold">
              Log in
            </Link>
          </p>
        ) : (
          <p className="text-center">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary-blue font-semibold">
              Register
            </Link>
          </p>
        )}
      </div>
    </section>
  );
};

export default Form;
