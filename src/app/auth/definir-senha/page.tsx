import { ActionCodeURL } from "firebase/auth";
import { FormDefineNewPassword } from "./components/FormDefineNewPassword";

export type ActionCodeProps = {
  actionCode: ActionCodeURL | null
}

export default function DefinirSenha({actionCode}: ActionCodeProps) {
  return (
    <main className="h-full w-full flex flex-col justify-center items-center gap-4 mobile:px-4">
      <h1 className="text-2xl">Escreva sua nova senha</h1>
      <FormDefineNewPassword actionCode={actionCode || null}/>
    </main>
  );
}
