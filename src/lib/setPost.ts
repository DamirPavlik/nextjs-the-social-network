import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";

export async function setPost(formData: FormData) {
  let data = {
    title: formData.get("title"),
    content: formData.get("content"),
    userId: formData.get("userId"),
  };
  await addDoc(collection(db, "posts"), {
    title: data.title,
    likes: 0,
    content: data.content,
    userId: data.userId,
  });
}
