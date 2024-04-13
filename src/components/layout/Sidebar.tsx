import { UserProps } from "@/types";
import Link from "next/link";

const Sidebar: React.FC<UserProps> = ({ user }) => {
  return (
    <section>
      <div className="mt-16 p-4 rounded-md border-border-color border-2">
        <div className="text-center">
          <img
            src={String(user?.photoURL)}
            alt=""
            className="border-4 w-72 h-72 object-cover rounded-full border-border-color mb-8 mx-auto"
          />
        </div>
        <div className="mb-8">
          <h6 className="text-[17px]">
            Username: <span className="font-semibold">{user?.displayName}</span>
          </h6>
          <h6 className="text-[17px]">
            Email: <span className="font-semibold">{user?.email}</span>
          </h6>
        </div>
        <div>
          <Link
            href={`users/${user?.displayName}`}
            className="w-full py-3 block text-center text-primary-text bg-primary-bg-tint hover:bg-primary-bg  border-[2px] border-border-color rounded-md transition-all duration-300 ease-linear"
          >
            View My Profile
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
