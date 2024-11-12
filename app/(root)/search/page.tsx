"use client"

import RightSidebar from "@/components/shared/RightSidebar";
import { Input } from "@/components/ui/input";
import React from "react";

function Search() {
  return (
    <section className="flex flex-1 text-white">
    <div className="col-center-item flex-1 mt-10 px-20">
      <Input type="search" className="w-full bg-transparent rounded-full" />
    </div>
    <div>
      <RightSidebar />
    </div>
    </section>
  );
}

export default Search;
