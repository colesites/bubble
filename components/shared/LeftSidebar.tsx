"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname /*useRouter*/ } from "next/navigation";
import More from "./More";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

function LeftSidebar() {
	//const route = useRouter();
	const pathname = usePathname();

	return (
		<section className="leftsidebar overflow-hidden">
			<div className="flex-col-evenly-item w-full">
				<div className="pb-10">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link href="/">
									<Image
										src="/assets/images/bubble-logo.png"
										alt="Bubble Logo"
										width={64}
										height={64}
									/>
								</Link>
							</TooltipTrigger>
							<TooltipContent>Bubble</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>

				<div>
					<ul className="col-flex gap-4 text-white px-10">
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
												<p
													className={
														isActive
															? "font-medium"
															: "text-white/80 text-base font-thin"
													}>
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
							<TooltipTrigger asChild>
								<div>
									<More />
								</div>
							</TooltipTrigger>
							<TooltipContent>More</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>

				<div className="col-item-center mt-10 gap-10 md:flex-row">
					<div className="cursor-pointer">{/*<BubbleAI />*/}</div>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href=""
									className="col-item-center w-24 h-24 overflow-hidden">
									<Avatar>
										<AvatarImage
											src="/assets/images/userprofile.jpg"
											alt="profile"
										/>
										<AvatarFallback>NM</AvatarFallback>
									</Avatar>
									<div>
										<p className="text-white text-[0.6rem]">@dml</p>
									</div>
								</Link>
							</TooltipTrigger>
							<TooltipContent>Profile</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</section>
	);
}

export default LeftSidebar;
