import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Button,
    Input,
    Textarea,
  } from "@/Components/ui";

import { PostValidation } from "@/lib/validation";
import { useToast } from "@/Components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import  {FileUploader, Loader } from "@/Components/shared";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/quriesAndMutations";

type PostFormProps = {
    post?: Models.Document;
    action: "Bubble" | "Update";
  };

  const PostForm = ({ post, action }: PostFormProps) => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user } = useUserContext();
    const form = useForm<z.infer<typeof PostValidation>>({
      resolver: zodResolver(PostValidation),
      defaultValues: {
        caption: post ? post?.caption : "",
        file: [],
        location: post ? post.location : "",
        tags: post ? post.tags.join(",") : "",
      },
    });

    // Query
  const { mutateAsync: createPost, isPending /*isLoading*/: isLoadingCreate } =
  useCreatePost();
  const { mutateAsync: updatePost, isPending /*isLoading*/: isLoadingUpdate } =
  useUpdatePost();

  // Handler
  const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
    // ACTION = UPDATE
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...value,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      });

      if (!updatedPost) {
        toast({
          title: `${action} post failed. Please try again.`,
        });
      }
      return navigate(`/posts/${post.$id}`);
    }

    // ACTION = CREATE
    const newPost = await createPost({
        ...value,
        userId: user.id,
      });
  
      if (!newPost) {
        toast({
          title: `${action} post failed. Please try again.`,
        });
      }
      navigate("/");
    };

    return (
        <Form {...form}>
            <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-5 w-full  max-w-2xl">

            <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="shad-form_label">Caption</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="First post"
                                className="shad-textarea custom-scrollbar"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className="shad-form_message" />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="shad-form_label">Add Media</FormLabel>
                    <FormControl>
                      <FileUploader
                        fieldChange={field.onChange}
                        mediaUrl={post?.imageUrl}
                      />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                    </FormItem>
                )}
            />

            <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="shad-form_label">Add Location</FormLabel>
                        <FormControl>
                            <Input placeholder="NYC" type="text" className="shad-input" {...field} />
                        </FormControl>
                        <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
            />

            <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="shad-form_label">
                            Add Tags (separated by comma " , ")
                        </FormLabel>
                        <FormControl>
                            <Input
                            placeholder="Social Media App, Bubble, C Tech"
                            type="text"
                            className="shad-input"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
            />

            <div className="flex gap-4 items-center justify-end">
                <Button
                    type="button"
                    className="bg-purple-one"
                    onClick={() => navigate(-1)}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="bg-purple-one whitespace-nowrap"
                    disabled={isLoadingCreate || isLoadingUpdate}>
                    {(isLoadingCreate || isLoadingUpdate) && <Loader />}
                    {action} Post
                </Button>
            </div>

        </form>
        </Form>
    )
  }

export default PostForm