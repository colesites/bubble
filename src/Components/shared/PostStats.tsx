import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { checkIsLiked } from "@/lib/utils";

import {
  //useViewPost,
  useLikePost,
  //useCommentPost,
  //useRebubblePost,
  useSavePost,
  useDeleteSavedPost,
  //useSharePost,
  useGetCurrentUser,
} from "@/lib/react-query/quriesAndMutations";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const location = useLocation();
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  //const viewsList = post.views.map((user: Models.Document) => user.$id);
  //const commentsList = post.comments.map((user: Models.Document) => user.$id);
  //const rebubbleList = post.reubble.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);
  /*
  const [views, setViews] = useState<string[]>(viewsList);
  const [comments, setComments] = useState<string[]>(commentsList);
  const [rebubble, setRebubble] = useState<string[]>(rebubbleList);
  */

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  //const handleViewedPost

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex gap-2">
        <img
          src="/assets/views/png"
          alt="views"
          width={20}
          height={20}
          className="cursor-pointer"
        />
        <p className="text-gray text-[14px] font-medium lg:text-[16px] lg:font-medium">{/*views.length*/}</p>
      </div>
      
      <div className="flex gap-2 mr-5">
        <img
          src={`${
              checkIsLiked(likes, userId)
                ? "/assets/liked.svg"
                : "/assets/like.svg"
            }`}
          alt="like"
          width={20}
          height={20}
          onClick={(e) => handleLikePost(e)}
          className="cursor-pointer"
        />
        <p className="text-gray text-[14px] font-medium lg:text-[16px] lg:font-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        <img
          src=""
          alt="comment"
          width={20}
          height={20}
          className="cursor-pointer"
        />
        <p className="text-gray text-[14px] font-medium lg:text-[16px] lg:font-medium">{/*comments.length*/}</p>
      </div>

      <div className="flex gap-2">
            <img
              src="/assets/rebubble.png"
              alt="rebubble"
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <p className="text-gray text-[14px] font-medium lg:text-[16px] lg:font-medium">{/*rebubble.length*/}</p>
      </div>

      <div className="flex gap-2">
            <img
              src={isSaved ? "/assets/saved.svg" : "/assets/save.svg"}
              alt="bookmark"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={(e) => handleSavePost(e)}
            />
      </div>

      <div className="flex gap-2">
            <img
              src="/assets/share.png"
              alt="share"
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <p className="text-gray text-[14px] font-medium lg:text-[16px] lg:font-medium">{/*shared.length*/}</p>
      </div>
    </div>
  )
}

export default PostStats