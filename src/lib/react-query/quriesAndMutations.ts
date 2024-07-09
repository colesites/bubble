import {
	useQuery,
	useMutation,
	useQueryClient,
	useInfiniteQuery,
} from "@tanstack/react-query";

import { QUERY_KEYS } from "./queryKeys";

import { createUserAccount, signInAccount, /*signOutAccount,*/ } from "../appwrite/api";
import { INewUser, INewPost, IUpdatePost, IUpdateUser } from "@/types";

export const useCreateUsersAccount = () => {
	return useMutation({
		mutationFn: (user: INewUser) => createUserAccount(user),
	});
};

export const useSignInAccount = () => {
	return useMutation({
		mutationFn: (user: { email: string; password: string }) =>
			signInAccount(user),
	});
};

/*export const useSignOutAccount = () => {
	return useMutation({
	  mutationFn: signOutAccount,
	});
  };*/