import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { PostStats } from "@/Components/shared";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return;

  return (
    <div className="z-50 bg-purple-one rounded-3xl p-5 lg:p-7 w-40 shadow-2xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src=""
              alt="profile"
              className="w-12 rounded-full object-cover object-top"
            />
          </Link>

          <div className="flex flex-col">
            <p className="text-[16px] font-medium leading-[140%] lg:text-[18px] lg:font-bold text-white">
              {post.creator.name}
            </p>
            <div className="flex justify-center items-center gap-2 text-gray">
              •
              <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal">
                {multiFormatDateString(post.$createdAt)}
              </p>
              •
              <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}>
          <img
            src={"/assets/edit.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="text-[14px] font-medium leading-[140%] lg:text-[16px] lg:font-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className="text-white text-[14px] font-normal leading-[140%]">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={post.imageUrl || ""}
          alt="image post"
          className="h-64 md:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5"
        />

      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  )
}

export default PostCard