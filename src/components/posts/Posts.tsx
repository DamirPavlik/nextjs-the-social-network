import { getPosts } from "@/lib/getPosts";
import Post from "./Post";

const Posts = async () => {
  const posts = await getPosts();

  return (
    <section className="mt-10">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </section>
  );
};

export default Posts;
