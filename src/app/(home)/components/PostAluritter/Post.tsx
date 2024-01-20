import { DeleteOutline, MoreVert, MoreVertOutlined } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";

type PostProps = {
  post: {
    email: string;
    text: string;
    created_at: number;
    id: string;
  };
};

export const Post = ({ post }: PostProps) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement | SVGSVGElement>(
    null
  );

  const date = new Date(post.created_at);

  const user = getAuth().currentUser;

  useEffect(() => {
    if (post.email !== user?.email) {
      setIsDeleted(false);
      return;
    }

    setIsDeleted(true);
  }, [post.email, user?.email, isDeleted]);

  const handleClickDelete = async () => {
    try {
      const db = getDatabase();

      const postListRef = ref(db, `posts/${post.id}`);

      if (post.email !== user?.email) {
        return;
      }

      await remove(postListRef);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full bg-white flex flex-col gap-8 px-4 pt-4 pb-1 rounded-lg drop-shadow-lg">
      <div className="w-full flex justify-between break-all gap-2">
        <p className="text-gray-600 w-full max-w-[39rem]">{post.text}</p>
        {isDeleted && (
          <MoreVertOutlined
            className="cursor-pointer"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          />
        )}
        <Menu
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClick={() => setAnchorEl(null)}
          open={!!anchorEl}
          anchorEl={anchorEl}
        >
          <MenuItem
            onClick={handleClickDelete}
            className="text-red-600 flex items-center bg-transparent hover:bg-red-500 hover:text-white"
          >
            <DeleteOutline className="mobile:text-xl" />
            <span>Deletar</span>
          </MenuItem>
        </Menu>
      </div>
      <div className="flex justify-between items-center h-full w-full flex-wrap">
        <span className="text-sm mobile:text-xs text-cyan-600">
          {post.email}
        </span>
        <span className="text-xs text-gray-500">{date.toLocaleString()}</span>
      </div>
    </div>
  );
};
