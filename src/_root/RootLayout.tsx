import LeftSidebar from "@/Components/shared/LeftSidebar"
import TopBar from "@/Components/shared/TopBar"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
    </div>
  )
}

export default RootLayout