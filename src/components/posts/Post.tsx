import { setLike } from "@/lib/setLike";
import { PostProps } from "@/types";
import Link from "next/link";
import { redirect } from "next/navigation";

const Post: React.FC<PostProps> = ({ id, username, title, content, likes }) => {
  return (
    <div
      key={id}
      className="w-full border-border-color border-2 py-4 px-5 mb-4"
    >
      <h5>{username}</h5>
      <h2 className="text-xl">{title}</h2>
      <p>{content}</p>

      <form
        action={async () => {
          "use server";
          await setLike(id, likes);
        }}
      >
        <button>Add like</button>
      </form>
      {likes}
    </div>
  );
};

export default Post;
