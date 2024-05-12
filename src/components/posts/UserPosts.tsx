import { getPosts } from "@/lib/getPosts";
import Post from "./Post";
import { auth } from "@/firebase/config";

const UserPosts = async () => {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post) => {
        if (auth.currentUser?.displayName === post.username) {
          return <Post key={post.id} {...post} />;
        }
      })}
    </div>
  );
};

export default UserPosts;
