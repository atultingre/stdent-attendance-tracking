"use client";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import { redirect, usePathname, useRouter } from "next/navigation";

const layout = ({ children }) => {
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
    <div>
      <div className="md:w-64 fixed hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default layout;
