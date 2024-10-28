"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
//import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostValidation } from "@/lib/validation";

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
} from "@/components/ui";
import { PostFormProps } from "@/types/PostFormProps";

const PostForm = ({ post, action }: PostFormProps) => {
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  return (
    <Form {...form}>
      <form className="col-flex w-full max-w-2xl gap-5">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="First post"
                  className="shad-textarea bg-transparent text-white text-xl border-dotted border-s-yellow-500 placeholder:text-white placeholder:focus:text-purple-900 custom-scrollbar"
                  {...field}
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
                <Input
                  placeholder="NYC"
                  type="text"
                  className="shad-input bg-black border-s-yellow-500 text-white border-dotted placeholder:focus:text-purple-900"
                  {...field}
                />
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
              <FormLabel className="shad-form_label">Add Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Social Media App, Bubble, C Tech"
                  type="text"
                  className="shad-input bg-black border-s-yellow-500 text-white border-dotted placeholder:focus:text-purple-900"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="row-item-center justify-end gap-4">
          <Button type="button">Cancel</Button>
          <Button type="submit">{action} Post</Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
