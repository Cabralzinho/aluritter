"use client";

import { ActionCodeURL, parseActionCodeURL } from "firebase/auth";
import { useEffect, useState } from "react";
import DefinirSenha from "./definir-senha/page";
import { useRouter } from "next/navigation";

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
        <DefinirSenha actionCode={actionCode} />
      )}
    </main>
  );
}
