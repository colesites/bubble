"use client"

import { AuthState } from "@/types/AuthState";
import { NewUser } from "@/types/NewUser";
import { create } from "zustand";

const useAuthStore = create<AuthState>((set) => ({
	user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user-info") || 'null') : null,
	login: (user: NewUser) => set({ user }),
	logout: () => set({ user: null }),
	setUser: (user: NewUser) => set({ user }),
}));

export default useAuthStore;
