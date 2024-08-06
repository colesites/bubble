import { Models } from "appwrite";
import Status from "@/Components/shared/Status";

import { Loader, PostCard, UserCard } from "@/Components/shared";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/quriesAndMutations";
import PremiumCard from "@/Components/shared/PremiumCard";
import { useUserContext } from "@/context/AuthContext";

const Home = () => {
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  const { user: currentUser } = useUserContext();

  const filteredCreators = creators?.documents.filter(
    (creator) => creator.$id !== currentUser?.id
  );

  /*if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 items-center gap-10 overflow-y-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
          <p className="text-[16px] font-medium text-white">Something bad happened</p>
        </div>
        <div className="hidden xl:flex flex-col items-center w-72 2xl:w-[465px] px-6 py-10 gap-10 overflow-y-scroll custom-scrollbar">
          <p className="text-[16px] font-medium text-white">Something bad happened</p>
        </div>
      </div>
    );
  }*/

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-y-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <Status />
        <div className="home-posts">
        <h2 className="text-white text-[24px] md:text-[30px] font-bold leading-[140%] tracking-tighter w-full">Home Feed</h2>
        {isPostLoading && !posts ? (
          <Loader />
        ) : (
          <ul className="flex flex-col flex-1 gap-9 w-full">
            {posts?.documents.map((post: Models.Document) => (
              <li key={post.$id} className="flex justify-center w-full">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>

      <div className="hidden xl:flex flex-col items-center w-72 2xl:w-[465px] px-6 py-10 gap-10 overflow-y-scroll custom-scrollbar">
        <div>
          <PremiumCard />
        </div>
        
        <h3 className="text-white text-xl font-semibold text-center">Who to follow</h3>
        {isUserLoading && creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {filteredCreators?.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Home