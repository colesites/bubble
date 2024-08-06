import { Routes, Route } from "react-router-dom";

import "./globals.css";
import AuthLayout from "./_auth/AuthLayout.js";
import SigninForm from "./_auth/forms/SigninForm.js";
import SignupForm from "./_auth/forms/SignupForm.js";
import RootLayout from "./_root/RootLayout.js";
import { Premium, Briefs, Saved, Settings, BubbleCast, BubblePost, Circle, Home, Messages, News, Notifications, Profile, Search } from "./_root/pages";

import { Toaster } from "@/Components/ui/toaster"

const App = () => {
	return (
		<main className="flex h-screen">
			<Routes>
				<Route element={<AuthLayout />}>
					{/* public routes */}
					<Route
						path="sign-in"
						element={<SigninForm />}
					/>
					<Route
						path="sign-up"
						element={<SignupForm />}
					/>
				</Route>

				{/* private routes */}
				<Route element={<RootLayout />}>
					<Route
						index
						element={<Home />}
					/>
					<Route path="/search" element={<Search />} />
					<Route path="/news" element={<News />} />
					<Route path="/notifications" element={<Notifications />} />
					<Route path="/messages" element={<Messages />} />
					<Route path="/circle" element={<Circle />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/bubblepost" element={<BubblePost />} />
					<Route path="/briefs" element={<Briefs/>} />
					<Route path="/bubblecast" element={<BubbleCast />} />
					<Route path="/saved" element={<Saved />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/Premium" element={<Premium />} />
				</Route>
			</Routes>

			<Toaster />
		</main>
	);
};

export default App;
