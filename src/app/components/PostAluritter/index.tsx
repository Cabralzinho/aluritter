import { auth } from "@/firebase/firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

type PostData = {
  email: string;
  hours: string;
  text: string;
};

export const PostAluritter = () => {
  const [postData, setPostData] = useState<PostData[]>([]);

  const db = getDatabase();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const dbRef = ref(db, "posts");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postDataArray = Object.values(data) as PostData[];
        setPostData(postDataArray);
      }
    });
  }, [userId, db]);

  return (
    <section className="flex flex-col justify-center items-center desktop:px-4 gap-4">
      {postData.map((post, index) => (
        <div key={index} className="w-full h-full max-w-[70rem] bg-white flex flex-col gap-8 px-4 pt-4 pb-1">
          <p className="text-gray-600">{post.text}</p>
          <div className="flex justify-between">
            <span className="text-sm text-cyan-600">{post.email}</span>
            <span className="text-xs text-gray-500">{post.hours}</span>
          </div>
        </div>
      ))}
    </section>
  );
};
