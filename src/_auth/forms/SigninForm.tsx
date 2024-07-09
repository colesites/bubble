import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { useToast } from "@/Components/ui/use-toast"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/Components/ui/form";

import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useForm } from "react-hook-form";
import { SigninValidation } from "@/lib/validation";
import Loader from "@/Components/shared/Loader";
import { useSignInAccount } from "@/lib/react-query/quriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

	const { mutateAsync: signInAccount } = useSignInAccount();

	// 1. Define your form.
	const form = useForm<z.infer<typeof SigninValidation>>({
		resolver: zodResolver(SigninValidation),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof SigninValidation>) {
	
			const session = await signInAccount({
				email: values.email,
				password: values.password,
			});
	
			if(!session) {
				toast({ title: "Login failed. Please try again." });
	
				return;
			}
	
			const isLoggedIn = await checkAuthUser();
	
			if(isLoggedIn) {
				form.reset();
	
				navigate("/")
			} else {
				return toast({ title: "Login failed. Please try again.", });
			}
		};

	return (
		<Form {...form}>
			<div className="sm:w-[300px] flex justify-center items-center flex-col">
				<img
					className="scale-[0.8]"
					src="/assets/bubble.png"
					alt="logo"
				/>

				<h2 className="text-white text-1xl font-[700]">Create a new account</h2>
				<p className="text-white text-xs">To use Bubble enter your details</p>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4 w-full mt-2">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-white">Email</FormLabel>
								<FormControl>
									<Input
										className="text-grey"
										type="email"
										placeholder="email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-white">Password</FormLabel>
								<FormControl>
									<Input
										className="text-grey"
										type="password"
										placeholder="Password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					
					<Button
						type="submit"
						className="bg-purple-one/60">
						{ isUserLoading ? (
							<div className="flex justify-center items-center gap-2">
								<Loader />
								Loading...
							</div>
						) : (
							"Sign In"
						)}
					</Button>

					<p className="text-white text-xs text-center">
						Don&apos;t have an account?
						<Link to="/sign-up" className="font-[600] ml-1">Sign Up</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SigninForm;