"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Menu from "./Menu";

// Topbar component - Renders the top navigation bar of the application
function Topbar() {
  return (
    // Main navigation container
    <nav className="topbar">
      {/* Inner container with full width and padding */}
      <div className="w-full flex-row-between-item py-4 px-5">
        {/* Logo/Home link */}
        <Link href="/">
          <Image
            src="/assets/images/bubble-logo.png"
            alt="logo"
            width={32}
            height={32}
          />
        </Link>

        {/* Right side container for profile and menu */}
        <div className="flex items-center gap-4">
          {/* Profile avatar link */}
          <Link href={``} className="flex-row-center-item gap-3">
            <Avatar>
              <AvatarImage src="/assets/images/userprofile.jpg" alt="profile" />
              <AvatarFallback>NM</AvatarFallback>
            </Avatar>
          </Link>

          {/* Menu button */}
          <div className="cursor-pointer">
            <Menu />
          </div> 
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
