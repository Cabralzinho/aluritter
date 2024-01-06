import { auth } from "@/firebase/firebase";
import { getDatabase, push, ref, set } from "firebase/database";
import { HTMLAttributes, useState } from "react";

type writeDataBaseProps = {
  userID: string | null | undefined;
  text: string;
  email: string | null | undefined;
  hours: string;
};

export const FormAlurittar = () => {
  const [maxLetters, setMaxLetters] = useState<number>(255);
  const [inputText, setInputText] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;

    const lettersRemaning = 255 - inputText.length;

    if (lettersRemaning >= 0) {
      setMaxLetters(lettersRemaning);
      setInputText(inputText);
    }

    if (lettersRemaning < 0) {
      e.target.value = inputText.slice(0, 255);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const db = getDatabase();
    const postListRef = ref(db, "posts");
    const newPostRef = push(postListRef);

    const date = new Date();
    const hours = date.toLocaleTimeString("pt-BR");
    const days = date.toLocaleDateString("pt-BR");

    set(newPostRef, {
      email: auth.currentUser?.email,
      text: inputText,
      hours: `${days} - ${hours}`,
    });

    setInputText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full max-w-[70rem] flex flex-col gap-3 desktop:px-4"
    >
      <label className="pl-2">Alutire agora mesmo...</label>
      <textarea
        onChange={handleInputChange}
        value={inputText}
        className="border border-slate-300 h-[8rem] max-h-[8rem] resize-none outline-none px-2 rounded"
      />
      <div className="flex justify-between">
        <p className="text-green-500 text-sm">
          Você ainda pode digitar {maxLetters} caracteres
        </p>
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-400 transition-all text-white px-4 py-2 rounded"
        >
          Aluritar
        </button>
      </div>
    </form>
  );
};
