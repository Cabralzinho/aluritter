import { auth } from "@/firebase/firebase";
import { getDatabase, push, ref, set } from "firebase/database";
import { useState } from "react";
import { Notification } from "../../../components/Notification";

export const FormAlurittar = () => {
  const [maxLetters, setMaxLetters] = useState<number>(255);
  const [inputText, setInputText] = useState<string>("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (maxLetters === 255) {
      setSuccess(false);

      return;
    }

    if (inputText.length < 5) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 4000);

      return;
    }

    setSuccess(true);
    setMaxLetters(255);
    setInputText("");
    setError(false);

    try {
      const db = getDatabase();
      const postListRef = ref(db, "posts");

      const newPostRef = push(postListRef);

      const postId = newPostRef.key;

      await set(newPostRef, {
        id: postId,
        email: auth.currentUser?.email,
        text: inputText,
        created_at: new Date().getTime(),
      });

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full flex flex-col gap-3 desktop:px-4"
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
      <Notification
        open={success}
        severity="success"
        horizontal="center"
        vertical="top"
        text="Aluritado com sucesso!"
      />
      <Notification
        open={error}
        severity="error"
        horizontal="center"
        vertical="top"
        text="Texto muito curto! precisa ter pelo menos 5 letras"
      />
    </form>
  );
};
