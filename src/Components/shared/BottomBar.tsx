import { Link, useLocation } from "react-router-dom";
import { bottomBarLinks } from "@/constants";

const BottomBar = () => {
  const { pathname } = useLocation();

  return (
    <section className="z-50 flex justify-between items-center w-full sticky bottom-0 rounded-[20px] bg-purple-one px-5 py-3 md:hidden">
      {bottomBarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={`bottombar-${link.label}`}
            to={link.route}
            className={`${
              isActive && "font-bold"
            } flex justify-center items-center flex-col gap-1 p-2 transition`}>
            <img
              src={isActive ? link.activeImgURL : link.imgURL}
              alt={link.label}
              width={20}
              height={20}
            />

            <p className={`${isActive ? 'font-semibold text-[10px] text-white leading-[140%]' : 'text-[10px] text-white/80 leading-[140%]'}`}>{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
}

export default BottomBar