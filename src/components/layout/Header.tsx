import { redirect } from "next/navigation";
import { Button } from "..";
import { logout } from "@/auth/logout";
import Link from "next/link";
import { auth } from "@/firebase/config";

const Header = () => {
  const username = auth.currentUser?.displayName;
  return (
    <header className="flex px-8 py-6 items-center justify-between bg-primary-bg-shade">
      <div className="flex items-center">
        <h6 className="leading-none text-lg">
          The<span className="font-semibold">SocialNetwork</span>
        </h6>
        <Link href="/" className="ml-12">
          Dashboard
        </Link>
        <Link href={`/my-profile/${username}`} className="ml-12">
          My Profile
        </Link>
      </div>
      <nav>
        <form
          action={async () => {
            "use server";
            await logout();
            redirect("/login");
          }}
        >
          <Button
            title="Logout"
            buttonType="submit"
            containerStyles="pt-2 pb-[7px] px-4"
          />
        </form>
      </nav>
    </header>
  );
};

export default Header;
