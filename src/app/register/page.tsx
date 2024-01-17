import Link from "next/link";
import { FormRegister } from "./components/FormRegister";

export default function Register() {
  return (
    <main className="h-full flex flex-col justify-center items-center gap-4 mobile:px-2">
      <h1 className="text-4xl text-cyan-500">Aluritter</h1>
      <h2 className="text-2xl text-cyan-600">Crie sua conta</h2>
      <FormRegister />
      <div className="flex gap-1">
        <p>Já possui uma conta?</p>
        <Link
          href="/login"
          className="text-cyan-600 hover:text-cyan-500 cursor-pointer"
        >
          Acesse agora!
        </Link>
      </div>
    </main>
  );
}
