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
import { SigninValidation } from "@/lib/validation";
import Image from "next/image";
import Link from "next/link";
import useSignInWithEmailAndPassword from "@/hooks/useSignInWithEmailAndPassword";
import { Spinner } from "@/components/ui/spinner";

const SigninPage = () => {
  // Initialize the form with default values and validation schema
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Destructure loading state and signin function from custom hook
  const { loading, signin } = useSignInWithEmailAndPassword();

  /**
   * Handles the sign-in form submission.
   * Attempts to sign in the user with the provided email and password.
   * Resets the form upon successful sign-in.
   * Logs any errors encountered during the sign-in process.
   */
  const handleSignInSubmit = async () => {
    try {
      await signin(form.getValues());
      form.reset();
    } catch (error) {
      console.error("Sign-in: ", error);
      !loading;
    }
  };

  return (
    // Render the form component with the form props
    <Form {...form}>
      <div className="sm:w-[18.75rem] flex-col-center-item">
        {/* Display the logo image */}
        <Image
          src="/assets/images/bubble-logo.png"
          width={120}
          height={120}
          alt="logo"
          className="scale-[0.8]"
        />

        {/* Display the heading */}
        <h2 className="text-xl font-[700] bg-gradient-to-r from-purple-1 to-orange-1 bg-clip-text text-transparent">
          Sign In to your account
        </h2>

        {/* Render the form fields */}
        <form className="col-flex w-full mt-2 gap-4">
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
                    placeholder="Password"
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
            onClick={form.handleSubmit(handleSignInSubmit)}
            disabled={!!loading}
          >
            {loading ? (
              <div className="row-flex gap-2 items-center">
                <Spinner /> Loading...
              </div>
            ) : (
              "Sign in"
            )}
          </Button>

          {/* Link to sign-up page */}
          <p className="text-white text-xs text-center">
            Don&apos;t have an account?
            <Link href="/sign-up" className="font-[600] ml-1">
              Sign Up
            </Link>
          </p>

          {/* Link to forgot password page */}
          <Link href="/forgot">
            <p className="text-white text-xs text-center">Forgot password?</p>
          </Link>
        </form>
      </div>
    </Form>
  );
};

export default SigninPage;
