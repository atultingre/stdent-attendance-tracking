"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React from "react";

const Header = () => {
  // const { user } = useKindeBrowserClient();
  return (
    <div className="flex justify-between items-center p-4 border-b shadow-sm">
      <div></div>
      {/* <div>
        <Image
          src={user?.picture}
          alt={user?.name}
          width={35}
          height={35}
          className="rounded-full"
        />
      </div> */}
    </div>
  );
};

export default Header;
