import Link from "next/link";
import { FormLogin } from "./components/FormLogin";

export default function Login() {
  return (
    <main className="h-full flex flex-col justify-center items-center gap-4 mobile:px-4">
      <h1 className="text-3xl text-cyan-500">Aluritter</h1>
      <h2 className="text-2xl text-cyan-600">Entrar na conta</h2>
      <FormLogin />
      <div className="flex gap-1 mobile:text-center">
        <p>Não possui uma conta?</p>
        <Link
          href="/register"
          className="text-cyan-600 hover:text-cyan-500 cursor-pointer"
        >
          Crie uma agora!
        </Link>
      </div>
    </main>
  );
}
