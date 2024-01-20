"use client";

import { Notification } from "@/app/components/Notification";
import { auth } from "@/lib/firebase-config";
import { UtilsValidate } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { FirebaseError } from "firebase/app";
import {
  AuthError,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormProps = z.infer<typeof schema>;

type Errors = AuthError | FirebaseError | any;

const schema = z
  .object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .refine((value) => UtilsValidate.HasNumber(value), {
        message: "Sua senha deve conter pelo menos um número",
      })
      .refine((value) => UtilsValidate.HasSymbom(value), {
        message: "Sua senha deve conter pelo menos um simbolo especial",
      })
      .refine((value) => UtilsValidate.HasUppercase(value), {
        message: "Sua senha deve conter pelo menos uma letra maiúscula",
      }),
    confirmPassword: z.string(),
  })
  .refine((value) => value.confirmPassword === value.password, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  });

export const FormRegister = () => {
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormProps>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmitRegister = handleSubmit(async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      if (user) {
        await updateProfile(user, {
          displayName: data.name,
        });
      }

      auth.useDeviceLanguage()

      await sendEmailVerification(user);

      router.push("/register/confirmation");
    } catch (err) {
      setError("Email já existe");
    }
  });

  return (
    <form
      className="flex flex-col gap-2 w-full max-w-[24rem]"
      onSubmit={onSubmitRegister}
    >
      <TextField
        {...register("name")}
        variant="standard"
        label="Nome"
        type="text"
        name="name"
        placeholder="Seu nome"
        error={!!errors.name}
        helperText={errors.name?.message as string}
      />
      <TextField
        {...register("email")}
        variant="standard"
        label="Email"
        type="email"
        name="email"
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
      <TextField
        {...register("confirmPassword")}
        variant="standard"
        label="Confirme sua senha"
        type="password"
        placeholder="Confirme sua senha"
        error={!!errors.password}
        helperText={errors.confirmPassword?.message as string}
      />
      {isSubmitting && (
        <div className="flex justify-center mt-4">
          <CircularProgress />
        </div>
      )}
      {!isSubmitting && (
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-500 p-2 rounded-md text-white mt-4"
        >
          Criar uma conta
        </Button>
      )}
      <p className="text-lg text-red-500 text-center">{error}</p>
      <Notification
        open={isSubmitSuccessful}
        vertical="top"
        horizontal="center"
        severity="success"
        text="Email de verificação enviado"
      />
    </form>
  );
};
