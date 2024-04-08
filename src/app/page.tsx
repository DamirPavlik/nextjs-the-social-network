import { getSession } from "@/auth/getSession";
import { Posts, PostsForm, Sidebar } from "@/components";
import Header from "@/components/layout/Header";
import { auth } from "@/firebase/config";
import { User } from "firebase/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser: User | null = auth.currentUser;
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="">
      <Header />
      <div className="max-w-[1440px] block mx-auto">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 bg-gray-200 p-4">
            <Sidebar user={currentUser} />
          </div>
          <div className="col-span-8 bg-gray-300 p-4">
            <PostsForm user={currentUser} />
            <Posts />
          </div>
        </div>
      </div>
    </main>
  );
}
