"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      redirect("/dashboard");
    } else {
      redirect("/sign-in");
    }
  }, []);

  return <div></div>;
}
