import { Button, TextField } from "@mui/material";
import { FormRecoveryPassword } from "./components/FormRecoveryPassword";
import Link from "next/link";

export default function RecuperarSenha() {
  return (
    <main className="h-full flex flex-col justify-center items-center gap-4 mobile:px-2">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-2xl">
          Para recuperar sua senha, digite seu e-mail
        </h1>
        <FormRecoveryPassword />
        <Link href="/login" className="text-cyan-600 hover:text-cyan-500"  >Voltar para o Login</Link>
      </div>
    </main>
  );
}
