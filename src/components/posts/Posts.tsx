import { getPosts } from "@/lib/getPosts";
import Post from "./Post";

const Posts = async () => {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Posts;
