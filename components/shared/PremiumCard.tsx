"use client";

import React from "react";
import { Button } from "../ui/button";

const PremiumCard = () => {
	return (
		<div className="col-item-center w-64 p-4 border-left-yellow rounded-[1.25rem] shadow-2xl">
			<h3 className="mb-1 text-lg font-bold bg-gradient-to-r from-purple-dark to-orange-1 bg-clip-text text-transparent">
				Subscribe to Premium
			</h3>
			<p className="mb-4 text-[11px]">
				Unlock exclusive features and elevate your experience - Subscribe to
				Bubble Premium today!
			</p>
			<Button font="medium">Subscribe</Button>
		</div>
	);
};

export default PremiumCard;
