import { Outlet } from "react-router-dom"

import LeftSidebar from "@/Components/shared/LeftSidebar"
import { BottomBar, Topbar } from "@/Components/shared"

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <BottomBar />
    </div>
  )
}

export default RootLayout