import { getSession } from "@/auth/getSession";
import { removeUser } from "@/auth/removeUser";
import { Button, Header, UserPosts } from "@/components";
import { auth } from "@/firebase/config";
import { redirect } from "next/navigation";

const UserProfile = async ({ params }: { params: { slug: string } }) => {
  const user = auth.currentUser;
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <Header />
      <div className="max-w-[1000px] block mx-auto mt-8">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center">
            <img
              src={String(user?.photoURL)}
              alt=""
              className="border-4 w-32 h-32 object-cover rounded-full border-border-color mx-auto mr-6"
            />
            <div>
              <h6 className="text-[17px] mr-6">
                Username:{" "}
                <span className="font-semibold">{user?.displayName}</span>
              </h6>
              <h6 className="text-[17px]">
                Email: <span className="font-semibold">{user?.email}</span>
              </h6>
            </div>
          </div>
          <div>
            <form
              action={async () => {
                "use server";
                redirect(`/my-profile/${params.slug}/edit`);
              }}
              className="mb-3"
            >
              <Button
                title="Edit Profile"
                buttonType="submit"
                containerStyles="py-2 px-14"
              />
            </form>
            <form
              action={async () => {
                "use server";
                await removeUser();
              }}
            >
              <Button
                title="Delete My Account"
                buttonType="submit"
                containerStyles="py-2 px-6 !border-[#CA0B00]"
              />
            </form>
          </div>
        </div>
        <hr className="bg-primary-bg-tint text-primary-bg-tint h-1" />
        <div className="mt-10">
          <UserPosts />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
