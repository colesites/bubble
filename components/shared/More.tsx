"use client";

import Image from "next/image";
import React, { useState } from "react";
import { sidebarLinks } from "@/constants/more";
import Link from "next/link";
import { usePathname /*useRouter*/ } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const More = () => {
	//const route = useRouter();
	const pathname = usePathname();
	const [activeMenu, setActiveMenu] = useState(false);

	return (
		<div
			onClick={() => setActiveMenu(!activeMenu)}
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
					<ul className="col-flex gap-2 text-white">
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
				</div>
			)}
		</div>
	);
};

export default More;
