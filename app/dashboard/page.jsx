"use client";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";

const dashboard = () => {
  const { setTheme } = useTheme();

  useEffect(()=>{
    setTheme('light')
  },[])
  return <div>dashboard</div>;
};

export default dashboard;
