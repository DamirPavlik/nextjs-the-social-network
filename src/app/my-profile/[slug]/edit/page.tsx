import { handleUpdateProfile } from "@/auth/handleUpdateProfile";
import { Button, Header } from "@/components";
import { auth } from "@/firebase/config";
import { redirect } from "next/navigation";

const Edit = async ({ params }: { params: { slug: string } }) => {
  const currentUser = auth.currentUser;
  console.log(currentUser);

  return (
    <>
      <Header />
      <section className="flex justify-center items-center h-[90vh] ">
        <div className="w-[800px] ">
          <form
            action={async (formData) => {
              "use server";
              await handleUpdateProfile(formData);
              redirect(`/my-profile/${params.slug}`);
            }}
            className="w-full"
          >
            <div>
              <input
                type="text"
                name="username"
                className="bg-primary-bg-tint border-[3px] border-border-color px-3 py-2 rounded-md w-full outline-none"
                placeholder={String(currentUser?.displayName)}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                className="bg-primary-bg-tint border-[3px] border-border-color px-3 py-2 rounded-md w-full outline-none"
                placeholder={String(currentUser?.email)}
              />
            </div>
            <Button
              title="Submit"
              buttonType="submit"
              containerStyles="w-full py-2"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default Edit;
