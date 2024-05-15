"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { GraduationCap, Hand, LayoutDashboard, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const SideNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  // const { user } = useKindeBrowserClient();
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },
    {
      id: 3,
      name: "Attendance",
      icon: Hand,
      path: "/dashboard/attendance",
    },
    {
      id: 4,
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];
  return (
    <div className="shadow-sm h-screen border-r ">
      <div className="flex items-center justify-center ">
        <Image
          src={"/logo.svg"}
          width={140}
          height={80}
          alt="logo"

          className="pt-2"
          // style={{ width: "auto", height: "auto" }}
        />
      </div>
      <hr className="my-5" />
      <div className="p-5">
        {menuList.map((menu) => (
          <Link href={menu?.path} className="" key={menu?.id}>
            <h2
              className={`flex items-center gap-3 text-md p-4 text-slate-500 ${
                pathname === menu.path
                  ? "bg-primary text-white rounded-lg cursor-pointer my-2"
                  : "hover:bg-primary hover:text-white hover:rounded-lg cursor-pointer my-2"
              } `}
            >
              <menu.icon />
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* <div className="flex gap-2 items-center bottom-5 fixed px-7">
        <Image
          src={user?.picture}
          alt={user?.name}
          width={25}
          height={25}
          className="rounded-full"
        />
        <div>
          <h2 className="text-sm font-bold">
            {user?.given_name} {user?.family_name}
          </h2>
          <h2 className="text-xs text-slate-400">{user?.email}</h2>
        </div>
      </div> */}
    </div>
  );
};

export default SideNav;
