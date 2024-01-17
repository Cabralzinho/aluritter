import { auth } from "@/firebase/firebase";
import { getDatabase, onChildRemoved, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Post } from "./Post";
import { Skeleton } from "@mui/material";

type PostData = {
  email: string;
  text: string;
  created_at: number;
  id: string;
};

export const PostAluritter = () => {
  const [postData, setPostData] = useState<PostData[]>([]);

  const db = getDatabase();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const dbRef = ref(db, "posts");

    onChildRemoved(dbRef, (snapshot) => {
      const deletedPostId = snapshot.key;

      setPostData((prevData) =>
        prevData.filter((item) => item.id !== deletedPostId)
      );
    });

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postDataArray = Object.values(data) as PostData[];
        setPostData(postDataArray);
      }
    });
  }, [userId, db]);

  return (
    <section className="flex flex-col justify-center items-center desktop:px-4 gap-4 w-full h-full">
      {postData.length > 0 && (
        <div className="w-full text-end text-sm">
          <p className="text-gray-600">Total de {postData.length} posts</p>
        </div>
      )}
      {postData.length === 0 && (
        <p className="text-gray-600">Nenhum post encontrado</p>
      )}
      {postData.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </section>
  );
};
