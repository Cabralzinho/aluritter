import { FormDefineNewPassword } from "./components/FormDefineNewPassword";

export default function DefinirSenha() {

  return (
    <main className="h-full flex flex-col justify-center items-center gap-4 mobile:px-4">
      <h1 className="text-2xl">Escreva sua nova senha</h1>
      <FormDefineNewPassword />
    </main>
  );
}
