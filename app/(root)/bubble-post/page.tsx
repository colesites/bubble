import React from "react";
import PostForm from "@/components/forms/PostForm";
import Image from "next/image";

function BubblePost() {
	return (
		<div className="flex flex-1">
			<div className="col-item-center flex-1 gap-10 overflow-y-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
				<div className="row-item-center max-w-5xl gap-3">
					<Image
						src="/assets/images/bubble-post-active.png"
						alt="bubble-post"
						width={30}
						height={30}
					/>
					<h2 className="w-full bg-gradient-to-r from-purple-950 to-orange-500 bg-clip-text text-transparent text-2xl font-bold leading-[140%]">
						Bubble Post
					</h2>
				</div>

				<PostForm action="Bubble" />
			</div>
		</div>
	);
}

export default BubblePost;
