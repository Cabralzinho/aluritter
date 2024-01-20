"use client";

import { auth } from "@/lib/firebase-config";
import { useRouter } from "next/navigation";
import { Navbar } from "./components/Navbar";
import { FormAlurittar } from "./components/FormAlurittar";
import { PostAluritter } from "./components/PostAluritter";
export default function Home() {
  const router = useRouter();

  auth.onAuthStateChanged((user) => {
    if (!user) {
      router.push("/login");
    }
  });

  return (
    <main className="gap-10 mobile:gap-6 flex items-center flex-col pb-4 overflow-x-hidden">
      <Navbar />
      <div className="p-4 w-full max-w-[45rem] items-center flex flex-col gap-4">
        <FormAlurittar />
        <PostAluritter />
      </div>
    </main>
  );
}
