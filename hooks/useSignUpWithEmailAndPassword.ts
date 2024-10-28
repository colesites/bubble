"use client";

import { auth, firestore } from "@/firebase/firebase";
import { NewUser } from "@/types/NewUser";
import { doc, setDoc } from "firebase/firestore";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useToast } from "@/hooks/use-toast";
import useAuthStore from "@/store/authStore";

const useSignUpWithEmailAndPassword = () => {
	const { toast } = useToast();

	const loginUser = useAuthStore((state) => state.login);
	//const authUser = useAuthStore((state) => state.user);

	const [createUserWithEmailAndPassword, loading, error] =
		useCreateUserWithEmailAndPassword(auth);

	const signup = async (inputs: NewUser) => {

		if (!inputs.email || !inputs.password || !inputs.username || !inputs.name) {
			toast({
				title: "Error",
				description: "Please fill all the fields",
				variant: "destructive",
				duration: 2500,
			});
			return;
		}

		try {
			const newUser = await createUserWithEmailAndPassword(
				inputs.email,
				inputs.password
			);

			if (error) {
				toast({
					title: "Error",
					description: "An error occurred",
					variant: "destructive",
					duration: 2500,
				});
				return;
			}

			if (!newUser) {
				toast({
					title: "Error",
					description: "Sign up failed. Please try again.",
					variant: "destructive",
					duration: 2500,
				});
				return;
			}

			if (newUser) {
				const userDocument = {
					uid: newUser.user.uid,
					name: inputs.name,
					username: inputs.username,
					email: inputs.email,
					password: inputs.password,
					bio: "",
					profilePicURL: "",
					followers: [],
					following: [],
					posts: [],
					story: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDocument);
				localStorage.setItem("user-info", JSON.stringify(userDocument));
				loginUser(userDocument);
				window.location.href = "/";
			}
		} catch (error) {
			if (error instanceof Error) {
				toast({
					title: "Error",
					description: error.message,
					variant: "destructive",
					duration: 2500,
				});
			} else {
				toast({
					title: "Error",
					description: "An unknown error occurred",
					variant: "destructive",
					duration: 2500,
				});
			}
		}
	};

	return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
