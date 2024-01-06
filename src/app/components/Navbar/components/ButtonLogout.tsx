import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export const ButtonLogout = () => {
  const router = useRouter()

  const Logout = async () => {
    try {
      await signOut(auth)

      router.push("/login")
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <button onClick={Logout} className="bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-1 rounded">
      Sair
    </button>
  );
};
