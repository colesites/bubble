'use client'

import React, { useState, useEffect } from 'react';
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import Topbar from "@/components/shared/Topbar";
import Loading from "./loading";

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Topbar />
      <main className="flex flex-row">
        <LeftSidebar />
        <section className="main-container">
          <div className="w-full">{children}</div>
        </section>
      </main>
      <Bottombar />
    </>
  );
}