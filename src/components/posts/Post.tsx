import { auth } from "@/firebase/config";
import { setLike } from "@/lib/setLike";
import { PostProps } from "@/types";
import Button from "../button/Button";

const Post: React.FC<PostProps> = ({
  id,
  username,
  title,
  content,
  likes,
  profilePicture,
}) => {
  return (
    <div
      key={id}
      className="w-full border-border-color border-2 py-6 px-6 mb-4"
    >
      <div className="flex items-center mb-6">
        <img
          src={profilePicture}
          alt=""
          className="border-2 w-14 h-14 object-cover rounded-full mr-4 border-border-color "
        />
        <h5 className="font-bold text-xl">{username}</h5>
      </div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{content}</p>

      <div className="flex items-center justify-end w-full">
        <form
          action={async () => {
            "use server";
            await setLike(id, likes);
          }}
          className="mr-3"
        >
          <button>Add like</button>
        </form>
        {likes}
      </div>

      {auth.currentUser?.displayName === username && (
        <form className="block mt-2">
          <Button
            title="Delete"
            containerStyles="px-3 py-2 block ml-auto !border-[#CA0B00]"
          />
        </form>
      )}
    </div>
  );
};

export default Post;
