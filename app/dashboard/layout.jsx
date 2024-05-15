"use client";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const layout = ({ children }) => {
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      redirect("/sign-in");
    }
    // else {
    //   redirect("/dashboard");
    // }
  }, []);

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
