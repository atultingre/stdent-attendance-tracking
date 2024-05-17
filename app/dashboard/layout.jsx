"use client";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "./_components/Header";

const layout = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="">
      <div className="fixed top-0 w-full z-20 bg-white">
        <Header />
      </div>
      <div className="flex mt-[65px] w-full flex-row">
        <div className={"md:w-64 fixed hidden md:block"}>
          <SideNav />
        </div>
        <div className="md:ml-64 w-full">{children}</div>
      </div>
    </div>
  );
};

export default layout;
