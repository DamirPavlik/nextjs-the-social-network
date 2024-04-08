import { auth, db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

export async function getPosts() {
  const postsCollection = await getDocs(collection(db, "posts"));
  const posts = postsCollection.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    content: doc.data().content,
    username: doc.data().username,
    likes: doc.data().likes,
  }));
  return posts;
}
