import { auth, db } from "@/firebase/config";
import { doc, getDoc, setDoc, collection, updateDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

export async function setLike(postId: string, currentLikes: number) {
  const username = auth.currentUser?.displayName as string;
  const postRef = doc(db, "posts", postId);
  const likesRef = collection(postRef, "likes");

  const userLikeRef = doc(likesRef, username);
  const userLikeDoc = await getDoc(userLikeRef);

  if (userLikeDoc.exists()) return;

  await setDoc(userLikeRef, {});

  const newLikes = currentLikes + 1;
  await updateDoc(postRef, { likes: newLikes });
  redirect("/");
}
