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

const More = () => {
	const pathname = usePathname();
	const [activeMenu, setActiveMenu] = useState(false);

	const handleSetActiveMenu = () => setActiveMenu(!activeMenu);

	const { handleSignOut } = useLogOut();

	return (
		<div
			onClick={handleSetActiveMenu}
			className="row-item-center gap-4 pt-4 px-10 cursor-pointer">
			<div>
				<Image
					src="/assets/images/more.png"
					alt="more"
					width={24}
					height={24}
				/>
			</div>

			<div>
				<p className="text-white text-base">More</p>
			</div>

			{activeMenu && (
				<div className="absolute bottom-20 w-auto h-auto bg-black p-5 rounded-2xl shadow-inner shadow-purple-3 z-50">
					<ul className="col-flex gap-2 text-white pb-8">
						{sidebarLinks.map((link) => {
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
