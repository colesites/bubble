//import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
//import { useSignOutAccount } from "@/lib/react-query/quriesAndMutations";
import Menu from "@/_root/pages/Menu";

const Topbar = () => {
  //const navigate = useNavigate();
  const { user } = useUserContext();
  /*const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);*/

  return (
    <section className="text-white sticky top-0 z-50 md:hidden bg-purple-one w-full">
      <div className="flex justify-between items-center py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/bubble.png"
            alt="logo"
            width={80}
          />
        </Link>

        <div className="flex gap-4 items-center">
          <Link to={`/profile/${user.id}`} className="flex justify-center items-center gap-3">
            <img
              src={user.imageUrl || "/assets/userprofile.jpg"}
              alt="profile"
              className="h-8 w-8 rounded-full object-cover object-top"
            />
          </Link>

          <Menu />
        </div>
      </div>
    </section>
  );
};

export default Topbar;