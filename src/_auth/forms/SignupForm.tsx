import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import {
	Form,
	FormControl,
	/*FormDescription,*/
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/Components/ui/form";

import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useForm } from "react-hook-form";
import { SignupValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/Components/shared/Loader";

const SignupForm = () => {
	const isLoading = false;

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
	async function onSubmit(values: z.infer<typeof SignupValidation>) {
		// const newUser = await createUserAccount(values);
	}

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
						className="bg-purple-one">
						{isLoading ? (
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
