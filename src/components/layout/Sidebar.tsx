import { UserProps } from "@/types";
import Link from "next/link";

const Sidebar: React.FC<UserProps> = ({ user }) => {
  return (
    <section>
      <div>
        photo:
        <img src={String(user?.photoURL)} alt="" />
      </div>
      <h6>Username: {user?.displayName}</h6>
      <h5>Email: {user?.email}</h5>
      <Link href={`users/${user?.displayName}`}>View My Profile</Link>
    </section>
  );
};

export default Sidebar;
