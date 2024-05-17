"use client";
import { GraduationCap, Hand, LayoutDashboard, Settings } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useStateContext } from "@/app/_components/StateContext";

export const menuList = [
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
const SideNav = () => {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <div className="shadow-sm h-screen border-r">
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

      <div className="flex gap-2 items-center bottom-5 fixed px-7">
        <UserButton />
        <div>
          <h2 className="text-sm font-bold">{user?.fullName}</h2>
          <h2 className="text-xs text-slate-400">
            {user?.primaryEmailAddress?.emailAddress}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
