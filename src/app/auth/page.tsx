"use client";

import { ActionCodeURL, parseActionCodeURL } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormDefineNewPassword } from "./FormDefineNewPassword";

export type ActionCodeProps = {
  actionCode: ActionCodeURL | null
}

export default function Auth() {
  const [operation, setOperation] = useState("");
  const [actionCode, setActionCode] = useState<ActionCodeURL | null>(null);

  const router = useRouter();

  useEffect(() => {
    const actionCode = parseActionCodeURL(window.location.href);

    setActionCode(actionCode);

    if (!actionCode) return;

    if (actionCode?.operation === "PASSWORD_RESET") {
      setOperation("PASSWORD_RESET");
      return;
    }

    if (actionCode?.operation === "VERIFY_EMAIL") {
      setOperation("VERIFY_EMAIL");
      return;
    }
  }, []);

  if (operation === "VERIFY_EMAIL") {
    return router.push("/login");
  }

  return (
    <main className="h-full flex justify-center items-center gap-4 mobile:px-4">
      {operation === "PASSWORD_RESET" && (
        <main className="h-full w-full flex flex-col justify-center items-center gap-4 mobile:px-4">
          <h1 className="text-2xl">Escreva sua nova senha</h1>
          <FormDefineNewPassword actionCode={actionCode} />
        </main>
      )}
    </main>
  );
}
