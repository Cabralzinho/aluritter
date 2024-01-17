import { useState } from "react";
import { useAuthentication } from "@/hooks/useAuthentication";
import { Avatar, Divider, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { Notification } from "@/app/components/Notification";

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openNotification, setOpenNotification] = useState(false);

  const user = useAuthentication();

  const router = useRouter();

  const Logout = async () => {
    try {
      await signOut(auth);

      setOpenNotification(true);

      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Menu
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
      >
        <div className="p-4 text-sm flex flex-col">
          <span className="font-bold">{user?.displayName}</span>
          <span className="text-xs">{user?.email}</span>
        </div>
        <MenuItem onClick={() => setAnchorEl(null)}>Configurações</MenuItem>
        <Divider />
        <MenuItem onClick={Logout}>
          <span className="text-red-500">Sair</span>
        </MenuItem>
      </Menu>
      <header className="flex w-full justify-center bg-white">
        <nav className="w-full max-w-[70rem] flex justify-between items-center px-1 py-3 tablet:px-10 mobile:px-10">
          <p className="text-lg text-cyan-500">Aluritter</p>
          <div className="flex items-center gap-3">
            <Avatar
              onClick={(e) => setAnchorEl(e.currentTarget)}
              alt="Thiago Cabral"
              className="cursor-pointer"
            >
              {user?.displayName?.split(" ")[0][0].toUpperCase()}
              {user?.displayName?.split(" ")[0][1].toUpperCase()}
            </Avatar>
          </div>
        </nav>
      </header>
      <Notification
        open={openNotification}
        severity="success"
        text="Deslogado com sucesso"
        vertical="top"
        horizontal="center"
      />
    </>
  );
};
