import BubbleAI from "@/_root/pages/BubbleAI";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import Loader from "./Loader";
import More from "@/_root/pages/More";

import ReactDOMServer from 'react-dom/server';
import { LuUserCircle2 } from "react-icons/lu";

const svgString = ReactDOMServer.renderToStaticMarkup(<LuUserCircle2 />);
console.log(svgString);

const LeftSidebar = () => {
  const {pathname} = useLocation();
  const { user, isLoading } = useUserContext();

  return (
    <nav>
        <div className="left-sidebar flex flex-col justify-evenly items-center h-full w-[250px] bg-left-sidebar-bg bg-opacity-[31%]">
          <div className="py-10">
            <img className="bubble w-[100px]" src="/assets/bubble.png" alt="Bubble Logo" />
          </div>

            <ul className="flex flex-col gap-4 text-white">
            {sidebarLinks.map((link: INavLink) => {
              const isActive = pathname === link.route;

              return(
                <li key={link.label} className={`${isActive && 'font-semibold'}`}>
                  <NavLink className="flex items-center gap-4 text-[1rem]" to={link.route}>
                    <img src={isActive ? link.activeImgURL : link.imgURL} alt={link.label} className="icons w-[24px]" />
                    {link.label}
                  </NavLink>
                </li>
              )
            })}
            </ul>

            <More />

            <div className="bottom-div flex flex-col mt-10 gap-10 md:flex-row">
              <div className="cursor-pointer">
                <BubbleAI />
              </div>
              <div>
                {isLoading || !user.email ? (
                  <div className="h-10 w-10">
                    <Loader />
                  </div>
                ) : (
                  <Link to={`/Profile/${user.id}`} className="profile flex flex-col items-center w-12 h-12 overflow-hidden">
                    <img className="h-9 w-9 rounded-full object-cover object-top" src={user.imageUrl || "/assets/userprofile.jpg"} alt="profile" />
                    <div className="text-white">
                      <p className="profile-text text-[0.6rem]">@{user.username || "bubble"}</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
        </div>
    </nav>
  )
}

export default LeftSidebar