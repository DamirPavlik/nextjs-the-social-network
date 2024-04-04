import { redirect } from "next/navigation";
import { Button } from "..";
import { logout } from "@/auth/logout";

const Header = () => {
  return (
    <header className="flex px-8 py-6 items-center justify-between bg-primary-bg-shade">
      <h6 className="leading-none text-lg">
        The<span className="font-semibold">SocialNetwork</span>
      </h6>
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
