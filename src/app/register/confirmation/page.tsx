"use client";

import { auth } from "@/firebase/firebase";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Confirmation() {
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser === null) {
      return router.push("/login");
    }
  }, [auth.currentUser]);

  return (
    <main className="bg-purple-100 h-full w-full flex justify-center items-center mobile:px-2 px-4">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl">
          Seu cadastro está quase pronto, confirme seu email para prosseguir
        </h1>
        <p className="text-xl">
          Caso não encontre o email, verifique sua caixa de spam
        </p>
        <p className="text-xl">
          Se o email ainda não foi enviado, verifique sua caixa de entrada e
          tente novamente em alguns minutos
        </p>
        <Link href="/login">
          <Button className="bg-green-600 hover:bg-green-500 text-white p-2">Ir para o login</Button>
        </Link>
      </div>
    </main>
  );
}
