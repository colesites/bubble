"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { SignupValidation } from "@/lib/validation";
import Image from "next/image";
import Link from "next/link";
import useSignUpWithEmailAndPassword from "@/hooks/useSignUpWithEmailAndPassword";
import { Spinner } from "@/components/ui/spinner";

const SignupPage = () => {
  // Initialize the form with default values and validation schema
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Destructure loading state and signup function from custom hook
  const { loading, signup } = useSignUpWithEmailAndPassword();

  /**
   * Handles the sign-up form submission.
   * Attempts to sign up the user with the provided form values.
   * Resets the form upon successful sign-up.
   */
  const handleSignUpSubmit = async () => {
    signup(form.getValues()).then(() => {
      form.reset();
    });
  };

  return (
    // Render the form component with the form props
    <Form {...form}>
      <div className="sm:w-[18.75rem] flex-col-center-item">
        {/* Display the logo image */}
        <Image
          className="scale-[0.8]"
          src="/assets/images/bubble-logo.png"
          width={120}
          height={120}
          alt="logo"
        />

        {/* Display the heading */}
        <h2 className="text-xl font-[700] bg-gradient-to-r from-purple-1 to-orange-1 bg-clip-text text-transparent">
          Create a new account
        </h2>

        {/* Render the form fields */}
        <form className="col-flex w-full mt-2 gap-4">
          {/* Name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-black placeholder:text-black"
                    type="text"
                    placeholder="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Username field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input
                    className="text-black placeholder:text-black"
                    type="text"
                    placeholder="username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-black placeholder:text-black"
                    type="email"
                    placeholder="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    className="text-black placeholder:text-black"
                    type="password"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit button */}
          <Button
            variant="signup"
            size="xs"
            type="submit"
            onClick={form.handleSubmit(handleSignUpSubmit)}
            disabled={!!loading}
          >
            {loading ? (
              <div className="row-flex gap-2 items-center">
                <Spinner /> Loading...
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
          {/* Link to sign-in page */}
          <p className="text-white text-xs text-center">
            Already have an account?
            <Link href="/sign-in" className="font-[600] ml-1">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupPage;
