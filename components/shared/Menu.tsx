"use client";

// Import necessary dependencies and components
import { topBarLinks } from "@/constants/more";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
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

/**
 * Menu Component
 * 
 * A dropdown menu component that displays navigation links and a logout option.
 * Features:
 * - Toggleable menu visibility
 * - Dynamic route highlighting for active links
 * - Tooltips for better user experience
 * - Responsive design with custom styling
 */
function Menu() {
  // Get current pathname for active route highlighting
  const pathname = usePathname();
  
  // State to manage menu visibility
  const [activeMenu, setActiveMenu] = useState(false);

  // Handler for toggling active menu
  const handleSetActiveMenu = () => setActiveMenu(!activeMenu);
  // Handler for closing active menu
  const handleCloseActiveMenu = () => setActiveMenu(false);

  /**
   * Handler for user sign out
   * @param e - React mouse event
   */
  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // TODO: Implement sign out logic
  };

  return (
    <div onClick={handleSetActiveMenu}>
      {/* Menu trigger button */}
      <div>
        <Image
          src="/assets/images/more.png"
          alt="menu"
          width={18}
          height={18}
        />
      </div>

      {/* Dropdown menu content - only visible when activeMenu is true */}
      {activeMenu && (
        <div className="absolute w-auto h-auto bg-black p-5 right-0 rounded-[0.9375rem] shadow-inner shadow-purple-500 z-50">
          {/* Close button */}
          <IconContext.Provider value={{ color: "white", size: "24px" }}>
            <IoClose
              className="text-white mb-5 cursor-pointer"
              onClick={handleCloseActiveMenu}
            />
          </IconContext.Provider>

          {/* Navigation menu */}
          <nav>
            <ul className="col-flex gap-2 pb-4 text-white">
              {/* Map through navigation links */}
              {topBarLinks.map((link) => {
                // Determine if current route is active
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
                          {/* Link icon with active/inactive state */}
                          <Image
                            src={isActive ? link.activeImgURL : link.imgURL}
                            alt={link.alt}
                            width={24}
                            height={24}
                          />
                          {/* Link text with conditional styling */}
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

          {/* Logout button with tooltip */}
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