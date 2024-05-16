"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = useUser();
  useEffect(() => {
    redirect("/dashboard");
  }, []);

  // useEffect(() => {
  //   if (!user) {
  //     redirect("/sign-in");
  //   }
  // }, [user]);

  return <div></div>;
}
