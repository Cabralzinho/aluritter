import { DeleteOutline } from "@mui/icons-material";
import { getDatabase, ref, remove } from "firebase/database";

type PostProps = {
  post: {
    email: string;
    text: string;
    created_at: number;
    id: string;
  };
};

export const Post = ({ post }: PostProps) => {
  const date = new Date(post.created_at);

  const handleClickDelete = async () => {
    try {
      const db = getDatabase()

      const postListRef = ref(db, `posts/${post.id}`);

      await remove(postListRef);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full bg-white flex flex-col gap-8 px-4 pt-4 pb-1 break-words rounded-lg drop-shadow-lg">
      <p className="text-gray-600">{post.text}</p>
      <div className="flex justify-between items-center h-full w-full">
        <span className="text-sm text-cyan-600">{post.email}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{date.toLocaleString()}</span>
          <DeleteOutline onClick={handleClickDelete} className="cursor-pointer text-red-600" />
        </div>
      </div>
    </div>
  );
};
