import PostForm from "@/Components/forms/PostForm";

const BubblePost = () => {
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className="flex max-w-5xl gap-3 items-center justify-start w-full">
          <img src="/assets/bubble post.png" alt="add" width={36} height={36} />
          <h2 className="text-white text-[24px] font-bold leading-[140%] tracking-tighter text-left w-full">Bubble Post</h2>
        </div>

        <PostForm action="Bubble" />
      </div>
    </div>
  )
}

export default BubblePost