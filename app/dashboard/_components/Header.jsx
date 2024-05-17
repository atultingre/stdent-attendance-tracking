import { Disclosure } from "@headlessui/react";
import { MenuIcon, X } from "lucide-react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { menuList } from "./SideNav";
import { usePathname } from "next/navigation";

const Header = () => {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <div>
      <Disclosure as="nav" className=" shadow-sm border-b">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 ">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-600  hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <X className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Image
                      src={"/logo.svg"}
                      width={140}
                      height={80}
                      alt="logo"
                      className="pt-2"
                    />
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {user && <UserButton />}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {menuList.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`flex items-center gap-3 text-md p-4 text-slate-500 ${
                      pathname === item.path
                        ? "bg-primary text-white rounded-lg cursor-pointer my-2"
                        : "hover:bg-primary hover:text-white hover:rounded-lg cursor-pointer my-2"
                    } `}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Header;
