"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  }, [user, router]);

  return (
    <div className="flex justify-center items-center h-screen text-xl  font-bold md:text-5xl animate-pulse">
      Loading...
    </div>
  );
}
