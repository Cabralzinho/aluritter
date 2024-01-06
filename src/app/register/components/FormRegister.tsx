"use client";

import { Input } from "@/app/components/Input";
import { auth } from "@/firebase/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormProps = z.infer<typeof schema>;

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const FormRegister = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmitRegister = handleSubmit(async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);

      router.push("/login")
    } catch (err) {
      console.log(err)
    }
  });

  return (
    <form
      className="flex flex-col gap-3 w-full max-w-[24rem]"
      onSubmit={onSubmitRegister}
    >
      <Input
        {...register("email")}
        type="email"
        placeholder="email@exemplo.com"
        error={!!errors.email}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <Input
        {...register("password")}
        type="password"
        placeholder="Senha"
        error={!!errors.password}
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      <button className="bg-green-600 hover:bg-green-500 p-2 rounded-md text-white">
        Criar uma nova conta
      </button>
    </form>
  );
};
