import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className="w-40 h-50 border border-purple-one flex justify-center items-center flex-col gap-1 rounded-[20px] p-5 shadow-2xl">
      <img
        src={user.imageUrl || "/assets/userprofile.jpg"}
        alt={user.name + " image"}
        className="rounded-full w-14 h-14"
      />

      <div className="flex justify-center items-center flex-col gap-1">
        <p className="text-[16px] font-medium leading-[140%] text-white text-center line-clamp-1">
          {user.name || "Bubble"}
        </p>
        <p className="text-[14px] font-medium leading-[140%] text-gray text-center line-clamp-1">
          @{user.username || "bubble"}
        </p>
      </div>

      <Button type="button" size="sm" className="px-5 bg-purple-one">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard