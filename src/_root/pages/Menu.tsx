import { useState } from 'react';
import { topBarLinks } from '@/constants/more';
import { INavLink } from "@/types";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSignOutAccount } from "@/lib/react-query/quriesAndMutations";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";

const Menu = () => {
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
        <div onClick={() => setActiveMenu(!activeMenu)}>
            <div>
                <img src="assets/more.png" alt="menu" className="w-[18px]" />
            </div>

            {activeMenu && (
                <div className="z-50 right-0 absolute bg-purple-one w-auto h-auto p-5 rounded-[15px] shadow-2xl">
                    <button onClick={() => setActiveMenu(false)}>
                        close
                    </button>

                    <nav>
                        <ul className="flex flex-col gap-2 text-white">
                    {topBarLinks.map((link: INavLink) => {
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

                    <button className="flex gap-4 pt-4 text-white"
                    onClick={(e) => handleSignOut(e)}>
                        <img src="/assets/logout.svg" alt="logout" />
                        <p>Logout</p>
                    </button>
                </div>
            )}
        </div>
    )
}

export default Menu