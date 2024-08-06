import { useState } from 'react';
import { leftBarLinks } from '@/constants/more';
import { INavLink } from "@/types";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSignOutAccount } from "@/lib/react-query/quriesAndMutations";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";

import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

const More = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const { setUser, setIsAuthenticated } = useUserContext();
  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <div onClick={() => setActiveMenu(!activeMenu)} className="flex flex-row gap-4 items-center pt-4 pl-[3.7rem] w-full cursor-pointer">
      <div>
        <img className="md:w-[24px] w-[18px]" src="assets/more.png" alt="more" />
      </div>

      <div>
        <p className="text-white text-[1rem]">More</p>
      </div>

          {activeMenu && (
            <div className="z-50 absolute bottom-20 bg-purple-one w-auto h-auto p-5 rounded-[15px] shadow-2xl">
              
              <IoClose className="text-white mb-5" onClick={() => setActiveMenu(false)} />
              
              <nav>
                <ul className="flex flex-col gap-2 text-white">
                {leftBarLinks.map((link: INavLink) => {
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
              </nav>

              <IconContext.Provider value={{ color: "white", size: "24px" }}>
                <button type="button" className="flex gap-4 pt-4 text-white" onClick={(e) => handleSignOut(e)}>
                  <CiLogout />
                  <p>Logout</p>
                </button>
              </IconContext.Provider>

            </div>
          )}
    </div>
  );
};

export default More