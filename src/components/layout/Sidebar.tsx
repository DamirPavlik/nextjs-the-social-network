import { UserProps } from "@/types";

const Sidebar: React.FC<UserProps> = ({ user }) => {
  return (
    <section>
      <h6>Username: {user?.displayName}</h6>
      <h5>Email: {user?.email}</h5>
    </section>
  );
};

export default Sidebar;
