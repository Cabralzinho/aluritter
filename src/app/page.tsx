"use client";

import { auth } from "@/firebase/firebase";
import { FormAlurittar } from "./components/FormAlurittar";
import { Navbar } from "./components/Navbar";
import { PostAluritter } from "./components/PostAluritter";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  auth.onAuthStateChanged((user) => {
    if (!user) {
      router.push("/login");
    }
  });

  return (
    <main className="gap-10 flex flex-col pb-4">
      <Navbar />
      <section className="flex flex-col justify-center items-center">
        <FormAlurittar />
      </section>
      <PostAluritter />
    </main>
  );
}
