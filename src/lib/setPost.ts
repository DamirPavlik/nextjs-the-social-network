import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";

export async function setPost(formData: FormData) {
  let data = {
    title: formData.get("title"),
    content: formData.get("content"),
    username: formData.get("username"),
    profilePicture: formData.get("profilePicture"),
  };
  await addDoc(collection(db, "posts"), {
    title: data.title,
    likes: 0,
    content: data.content,
    username: data.username,
    profilePicture: data.profilePicture,
  });
}
