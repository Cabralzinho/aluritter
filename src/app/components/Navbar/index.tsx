import { ButtonLogout } from "./components/ButtonLogout";
import { useAuthentication } from "@/hooks/useAuthentication";

export const Navbar = () => {
  const user = useAuthentication()

  return (
    <header>
      <nav className="bg-white flex justify-between items-center px-6 py-3">
        <p className="text-lg text-cyan-500">Aluritter</p>
        <div className="flex items-center gap-3">
          <p className="text-gray-500 text-sm">{user?.email}</p>
          <ButtonLogout />
        </div>
      </nav>
    </header>
  );
};
