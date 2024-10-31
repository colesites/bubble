"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Menu from "./Menu";

function Topbar() {
  return (
    <nav className="topbar">
      <div className="w-full flex-row-between-item py-4 px-5">
        <Link href="/">
          <Image
            src="/assets/images/bubble-logo.png"
            alt="logo"
            width={32}
            height={32}
          />
        </Link>

        <div className="flex items-center gap-4">
          <Link href={``} className="flex-row-center-item gap-3">
            <Avatar>
              <AvatarImage src="/assets/images/userprofile.jpg" alt="profile" />
              <AvatarFallback>NM</AvatarFallback>
            </Avatar>
          </Link>

          <div className="cursor-pointer">
            <Menu />
          </div> 
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
