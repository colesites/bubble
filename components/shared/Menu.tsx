"use client";

import { topBarLinks } from "@/constants/more";
import Image from "next/image";
import { useState } from "react";
import { usePathname /*useRouter*/ } from "next/navigation";

import { IconContext } from "react-icons";
import { CiLogout } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";

function Menu() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState(false);
  const handleSetActiveMenu = () => setActiveMenu(!activeMenu);
  const handleCloseActiveMenu = () => setActiveMenu(false);
  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
  };

  return (
    <div onClick={handleSetActiveMenu}>
      <div>
        <Image
          src="/assets/images/more.png"
          alt="menu"
          width={18}
          height={18}
        />
      </div>

      {activeMenu && (
        <div className="absolute w-auto h-auto bg-black p-5 right-0 rounded-[0.9375rem] shadow-inner shadow-purple-500 z-50">
          <IconContext.Provider value={{ color: "white", size: "24px" }}>
            <IoClose
              className="text-white mb-5 cursor-pointer"
              onClick={handleCloseActiveMenu}
            />
          </IconContext.Provider>

          <nav>
            <ul className="col-flex gap-2 pb-4 text-white">
              {topBarLinks.map((link) => {
                const isActive =
                  (pathname.includes(link.route) && link.route.length > 1) ||
                  pathname === link.route;

                return (
                  <TooltipProvider key={link.label}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={link.route}
                          key={link.label}
                          className="row-item-center gap-4"
                        >
                          <Image
                            src={isActive ? link.activeImgURL : link.imgURL}
                            alt={link.alt}
                            width={24}
                            height={24}
                          />
                          <p
                            className={isActive ? "font-semibold" : "text-base"}
                          >
                            {link.label}
                          </p>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>{link.label}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </ul>
          </nav>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IconContext.Provider value={{ color: "white", size: "24px" }}>
                  <button
                    type="button"
                    className="flex gap-4 text-white"
                    onClick={handleSignOut}
                  >
                    <CiLogout />
                    <p>Logout</p>
                  </button>
                </IconContext.Provider>
              </TooltipTrigger>
              <TooltipContent>Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}

export default Menu;
