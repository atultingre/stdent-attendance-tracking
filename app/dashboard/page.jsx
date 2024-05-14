"use client";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";

const dashboard = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, []);

  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl">Dashboard</h2>
    </div>
  );
};

export default dashboard;
