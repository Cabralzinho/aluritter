"use client";

import { Notification } from "@/app/components/Notification";
import { auth } from "@/firebase/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, TextField } from "@mui/material";
import { FirebaseError } from "firebase/app";
import {
  AuthError,
  getRedirectResult,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Errors = AuthError | FirebaseError | any;

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const FormLogin = () => {
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmitLogin = handleSubmit(async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);

      setError("");

      router.push("/");
    } catch (err: Errors) {
      setError("Credênciais inválidas");
    }
  });

  return (
    <form
      onSubmit={onSubmitLogin}
      className="flex flex-col gap-3 w-full max-w-[24rem]"
    >
      <TextField
        {...register("email")}
        variant="standard"
        label="Email"
        type="email"
        placeholder="email@exemplo.com"
        error={!!errors.email}
        helperText={errors.email?.message as string}
      />

      <TextField
        {...register("password")}
        variant="standard"
        label="Senha"
        type="password"
        placeholder="Senha"
        error={!!errors.password}
        helperText={errors.password?.message as string}
      />
      <p className="text-gray-700">
        Esqueceu sua senha?{" "}
        <Link href="/recuperar-senha" className="text-blue-500">
          Clique Aqui
        </Link>
      </p>
      {isSubmitting && (
        <div className="flex justify-center pt-2">
          <CircularProgress />
        </div>
      )}
      {!isSubmitting && (
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-500 p-2 rounded-md text-white mt-4"
        >
          Acessar plataforma
        </Button>
      )}
      <p className="text-lg text-red-500 text-center">{error}</p>
      <Notification
        open={isSubmitSuccessful}
        severity="success"
        vertical="top"
        horizontal="center"
        text="Login efetuado com sucesso"
      />
    </form>
  );
};
