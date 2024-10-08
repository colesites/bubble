"use client";

import Link from "next/link";
import React from "react";
import UserCard from "../cards/UserCard";

const WhoToFollow = () => {
	return (
		<div className="col-item-center w-64 py-2 px-2 border-left-yellow rounded-[1.25rem] shadow-2xl">
			<h3 className="mt-4 mb-2 text-white text-sm text-center font-semibold">
				You Might Like
			</h3>
			<ul className="col-flex w-full gap-6">
				<li>
					<UserCard />
				</li>
			</ul>
			<Link href="">
				<p className="w-full mt-4 text-xs text-left cursor-pointer">
					show more
				</p>
			</Link>
		</div>
	);
};

export default WhoToFollow;
