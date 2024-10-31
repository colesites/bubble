"use client";

import Image from "next/image";
import React, { useState } from "react";
import { sidebarLinks } from "@/constants/more";
import Link from "next/link";
import useLogOut from "@/hooks/useLogOut";
import { usePathname /*useRouter*/ } from "next/navigation";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

import { IconContext } from "react-icons";
import { CiLogout } from "react-icons/ci";

/**
 * More Component
 * 
 * A navigation component that displays a "More" button which reveals additional
 * sidebar links and a logout option when clicked.
 * 
 * Features:
 * - Toggleable menu with additional navigation options
 * - Active route highlighting
 * - Tooltip support for better UX
 * - Logout functionality
 */

const More = () => {
	const pathname = usePathname(); // Get current pathname for active route highlighting
	const [activeMenu, setActiveMenu] = useState(false); // State to manage menu visibility

	const handleSetActiveMenu = () => setActiveMenu(!activeMenu); // Toggle menu visibility

	const { handleSignOut } = useLogOut(); // Custom hook for handling logout functionality

	return (
		<div
			onClick={handleSetActiveMenu}
			className="row-item-center gap-4 pt-4 px-10 cursor-pointer">
			{/* More button icon */}
			<div>
				<Image
					src="/assets/images/more.png"
					alt="more"
					width={24}
					height={24}
				/>
			</div>

			{/* More button text */}
			<div>
				<p className="text-white text-base">More</p>
			</div>

			{/* Dropdown menu - only visible when activeMenu is true */}
			{activeMenu && (
				<div className="absolute bottom-20 w-auto h-auto bg-black p-5 rounded-2xl shadow-inner shadow-purple-3 z-50">
					{/* Navigation links list */}
					<ul className="col-flex gap-2 text-white pb-8">
						{sidebarLinks.map((link) => {
							// Check if current route is active
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
												className="row-item-center gap-4">
												<Image
													src={isActive ? link.activeImgURL : link.imgURL}
													alt={link.alt}
													width={24}
													height={24}
												/>
												<p className={isActive ? "font-semibold" : "text-base"}>
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

					{/* Logout button with tooltip */}
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<IconContext.Provider value={{ color: "white", size: "24px" }}>
									<button
										onClick={handleSignOut}
										type="button"
										className="flex gap-4 text-white">
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
};

export default More;
