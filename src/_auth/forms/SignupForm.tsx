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
import { SignupValidation } from "@/lib/validation";
import Loader from "@/Components/shared/Loader";
import { useCreateUsersAccount, useSignInAccount } from "@/lib/react-query/quriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

	const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUsersAccount();
	const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();

	// 1. Define your form.
	const form = useForm<z.infer<typeof SignupValidation>>({
		resolver: zodResolver(SignupValidation),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
		try {

			const newUser = await createUserAccount(user);
	
			if(!newUser) {
				toast({ title: "Sign up failed please try again.", });
	
				return;
			}
	
			const session = await signInAccount({
				email: user.email,
				password: user.password,
			});
	
			if(!session) {
				toast({ title: "Something went wrong. Please login your new account", });
				
				navigate("/sign-in");
	
				return;
			}
	
			const isLoggedIn = await checkAuthUser();
	
			if(isLoggedIn) {
				form.reset();
	
				navigate('/')
			} else {
				toast({ title: 'Sign up failed please try again.' });
	
				return;
			}
		} catch (error) {
			console.log({ error });
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
					onSubmit={form.handleSubmit(handleSignup)}
					className="flex flex-col gap-4 w-full mt-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-white">Name</FormLabel>
								<FormControl>
									<Input
										className="text-grey"
										type="text"
										placeholder="name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-white">Username</FormLabel>
								<FormControl>
									<Input
										className="text-grey"
										type="text"
										placeholder="username"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
										placeholder="password"
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
						{isCreatingAccount || isSigningIn || isUserLoading ? (
							<div className="flex justify-center items-center gap-2">
								<Loader />
								Loading...
							</div>
						) : (
							"Sign up"
						)}
					</Button>

					<p className="text-white text-xs text-center">
						Already have an account?
						<Link to="/sign-in" className="font-[600] ml-1">Log in</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignupForm;
