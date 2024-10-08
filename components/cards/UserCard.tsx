"use client";

import React from "react";
import ProfileImage from "../shared/ProfileImage";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

function UserCard() {
	return (
		<Link
			href=""
			className="flex-row-between-item w-full">
			<div className="row-flex gap-2">
				<ProfileImage>
					<Image
						width={40}
						height={40}
						src="/assets/images/userprofile.jpg"
						alt="profile"
					/>
				</ProfileImage>

				<div className="flex-col-center">
					<p className="text-white text-sm text-left font-medium leading-[140%] line-clamp-1">
						John Terry
					</p>
					<p className="text-gray text-[9px] text-left font-normal leading-[140%] line-clamp-1">
						@johnterry
					</p>
				</div>
			</div>

			<div className="flex">
				<Button
					type="button"
					value="small"
					size="sm">
					Follow
				</Button>
			</div>
		</Link>
	);
}

export default UserCard;
