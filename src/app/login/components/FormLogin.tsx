"use client"

import Input from "@/app/components/Input";
import { auth } from "@/firebase/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const FormLogin = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmitLogin = handleSubmit(async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);

      router.push("/");
    }
    catch (err) {
      console.log(err)
    }
  });

  return (
    <form onSubmit={onSubmitLogin} className="flex flex-col gap-3 w-full max-w-[24rem]">
      <Input
        {...register("email")}
        type="email"
        placeholder="email@exemplo.com"
        error={!!errors}
      />
      <Input
        {...register("password")}
        type="password"
        placeholder="Senha"
        error={!!errors}
      />
      <button className="bg-green-600 hover:bg-green-500 p-2 rounded-md text-white">
        Acessar plataforma
      </button>
    </form>
  );
};
