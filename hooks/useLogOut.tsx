"use client";

import { auth } from "@/firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { useToast } from "@/hooks/use-toast";
import useAuthStore from "@/store/authStore";

const useLogOut = () => {
	const { toast } = useToast();

	const [signOut, isLoggingOut, error] = useSignOut(auth);

  const logoutUser = useAuthStore((state) => state.logout);

	const handleSignOut = async () => {
		try {
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser;
		} catch (error) {
			toast({
				title: "Error",
				description: "Something went wrong",
				variant: "destructive",
				duration: 2500,
			});
		}
	};

	return { handleSignOut, isLoggingOut, error };
};

export default useLogOut;
