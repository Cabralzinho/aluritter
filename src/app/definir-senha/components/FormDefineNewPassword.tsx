"use client";

import { Notification } from "@/app/components/Notification";
import { auth } from "@/lib/firebase-config";
import { UtilsValidate } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, TextField } from "@mui/material";
import {
  ActionCodeURL,
  confirmPasswordReset,
  getAuth,
  updatePassword,
  verifyPasswordResetCode,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormProps = z.infer<typeof schema>;

const schema = z
  .object({
    password: z
      .string()
      .min(6, "senha deve ter pelo menos 6 caracteres")
      .refine((value) => UtilsValidate.HasNumber(value), {
        message: "Sua senha deve ter pelo menos um número",
      })
      .refine((value) => UtilsValidate.HasSymbom(value), {
        message: "Sua senha deve ter pelo menos um simbolo especial",
      })
      .refine((value) => UtilsValidate.HasUppercase(value), {
        message: "Sua senha deve ter pelo menos uma letra maiúscula",
      }),
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  });

export const FormDefineNewPassword = () => {
  const router = useRouter();

  const user = auth.currentUser;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormProps>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const handleSubmitPassword = handleSubmit(async (data) => {
    try {
      if (typeof window !== "undefined") {
        const actionCode = ActionCodeURL.parseLink(window.location.href)?.code;

        await verifyPasswordResetCode(auth, actionCode as string);

        await confirmPasswordReset(auth, actionCode as string, data.password);

        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <form
      onSubmit={handleSubmitPassword}
      className="flex flex-col gap-4 text-center w-full max-w-[25rem]"
    >
      <TextField
        {...register("password")}
        label="Senha"
        type="password"
        variant="standard"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        {...register("confirmPassword")}
        label="Confirmar Senha"
        type="password"
        variant="standard"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
      {isSubmitting && (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      )}
      {!isSubmitting && (
        <Button
          className="bg-green-600 hover:bg-green-500 text-white"
          type="submit"
        >
          Definir senha
        </Button>
      )}
      <Notification
        open={isSubmitSuccessful}
        text="Senha alterada com sucesso"
        vertical="top"
        horizontal="center"
        severity="success"
      />
    </form>
  );
};
