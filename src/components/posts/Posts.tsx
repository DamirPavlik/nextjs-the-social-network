import { auth } from "@/firebase/config";
import { getPosts } from "@/lib/getPosts";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

const Posts = async () => {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="w-full border-border-color border-2 py-4 px-5 mb-4"
        >
          <h2 className="text-xl">{post.title}</h2>
          <p>Post Content:{post.content}</p>
          <p>Username: {post.username}</p>
          <p>Likes: {post.likes}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
