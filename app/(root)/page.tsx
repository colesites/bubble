"use client"

import RightSidebar from "@/components/shared/RightSidebar";
import useAuthStore from "@/store/authStore";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function Home() {
	const authUser = useAuthStore((state) => state.user);
	const router = useRouter();

	useEffect(() => {
    if (!authUser) {
      router.push("/sign-in");
    } else {
			router.push("/");
		}
  }, [authUser, router]);

	return (
		<section className="flex flex-1 text-white">
			<div className="col-item-center flex-1 gap-10 py-10 overflow-y-scroll custom-scrollbar">
				{/*<Status />*/}
				{/*<Main />*/}
				<p>y</p>
			</div>
			<div>
				<RightSidebar />
			</div>
		</section>
	);

}

export default Home;
