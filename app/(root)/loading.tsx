"use client"

import Image from "next/image";

import useAuthStore from "@/store/authStore";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Loading() {
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
    
      <section className="flex flex-col justify-center items-center bg-black w-full h-screen">
        <div className="flex justify-center items-center flex-grow">
          <Image
            src="/assets/images/bubble-svg.svg"
            width={120}
            height={120}
            alt="Bubble logo"
            priority
          />
        </div>
        
        <div className="flex flex-col gap-4 mb-2 mt-auto items-center">
          <p className="text-white">from</p>
          <Image
            src="/assets/images/ctech.svg"
            width={30}
            height={30}
            alt="C Tech Logo"
            priority
          />
        </div>
      </section>
  );
}