"use server";
import { authFormProps } from "@/types";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button, Error } from "..";
import { cookies } from "next/headers";
import { handleLogin } from "@/auth/handleLogin";
import { handleRegister } from "@/auth/handleRegister";

const Form: React.FC<authFormProps> = async ({ isRegister }) => {
  let errorsObj;
  const registerErrorCookie = cookies().get("registerError");

  if (registerErrorCookie) {
    try {
      const errors = registerErrorCookie.value;
      if (errors) {
        errorsObj = JSON.parse(errors);
      }
    } catch (e) {
      console.error("Failed to parse JSON from registerError cookie:", e);
    }
  }

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
              await handleRegister(formData);
            } else {
              await handleLogin(formData);
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
            {errorsObj ? <Error errors={errorsObj} type="email" /> : null}
          </div>
          <div className="mb-6">
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
            {errorsObj ? <Error errors={errorsObj} type="password" /> : null}
            {cookies().get("loginError") ? (
              <p>{cookies().get("loginError")?.value}</p>
            ) : null}
          </div>
          {isRegister && (
            <>
              <div className="mb-6">
                <label htmlFor="username" className="block">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  className="bg-primary-bg-tint border-[3px] border-border-color px-3 py-2 rounded-md w-full outline-none"
                />
                {errorsObj ? (
                  <Error errors={errorsObj} type="username" />
                ) : null}
              </div>
              <div className="mb-6">
                <label htmlFor="profilePhoto" className="block">
                  Profile Picture
                </label>
                <input
                  type="file"
                  name="profilePhoto"
                  id="profilePhoto"
                  className="w-full"
                />
              </div>
            </>
          )}
          <Button
            title="Submit"
            buttonType="submit"
            containerStyles="pt-2 pb-[7px] w-full mt-2"
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
