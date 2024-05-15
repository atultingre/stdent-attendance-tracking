"use client";
import { UserButton, useUser } from "@clerk/nextjs";

import React from "react";

const Header = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center p-4 border-b shadow-sm min-h-18">
      <div></div>
      {user && <UserButton />}
    </div>
  );
};

export default Header;
