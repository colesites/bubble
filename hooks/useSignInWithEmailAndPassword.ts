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
			const userCred = await signInWithEmailAndPassword(
				inputs.email,
				inputs.password
			);

			if (!userCred) {
				toast({
					title: "Error",
					description: "Incorrect Email or Password",
					variant: "destructive",
					duration: 2500,
				});
				return;
			}

			if (userCred) {
				const docRef = doc(firestore, "users", userCred.user.uid);
				const docSnap = await getDoc(docRef);
				localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
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

	return { loading, error, signin };
};

export default useSignIn;
