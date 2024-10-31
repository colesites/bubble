"use client";

import { auth, firestore } from "@/firebase/firebase";
import { SignInUser } from "@/types/SignInUser";
import { doc, getDoc } from "firebase/firestore";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useToast } from "@/hooks/use-toast";

const useSignIn = () => {
	const { toast } = useToast();

	const [signInWithEmailAndPassword, loading, error] =
		useSignInWithEmailAndPassword(auth);

	const signin = async (inputs: SignInUser): Promise<void> => {
		// Check if email and password fields are filled
		if (!inputs.email || !inputs.password) {
			toast({
				title: "Error",
				description: "Please fill all the fields",
				variant: "destructive",
				duration: 2500,
			});

			return Promise.resolve();
		}

		try {
			// Attempt to sign in with email and password
			const userCred = await signInWithEmailAndPassword(
				inputs.email,
				inputs.password
			);

				// If sign-in fails, show error toast
			if (!userCred) {
				toast({
					title: "Error",
					description: "Incorrect Email or Password",
					variant: "destructive",
					duration: 2500,
				});
				return;
			}

			// If sign-in succeeds, fetch user data and store in local storage
			if (userCred) {
				const docRef = doc(firestore, "users", userCred.user.uid);
				const docSnap = await getDoc(docRef);
				localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
				window.location.href = "/";
			}
		} catch (error) {
			// Handle errors and show appropriate toast messages
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

	return { loading, error, signin };
};

export default useSignIn;
