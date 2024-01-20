"use client";

import { auth } from "@/lib/firebase-config";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, TextField } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormProps = z.infer<typeof schema>;

const schema = z.object({
  email: z.string().email("Email inválido"),
});

export const FormRecoveryPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormProps>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmitRecovery = handleSubmit(async (data) => {
    try {
      if (typeof window !== 'undefined') {
        auth.useDeviceLanguage();
        await sendPasswordResetEmail(auth, data.email);
      }  
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <form onSubmit={onSubmitRecovery} className="flex flex-col gap-4">
      <TextField
        {...register("email")}
        label="E-mail"
        type="email"
        variant="standard"
        placeholder="email@example.com"
        error={!!errors.email}
        helperText={errors.email?.message}
        required
        autoFocus
      />
      {isSubmitSuccessful && (
        <p className="text-green-500">
          Link de redefinição de senha enviado com sucesso
        </p>
      )}
      {isSubmitting && (
        <div className="flex justify-center w-full">
          <CircularProgress />
        </div>
      )}
      {!isSubmitting && (
        <Button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg"
        >
          Recuperar Senha
        </Button>
      )}
    </form>
  );
};
