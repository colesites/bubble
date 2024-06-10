import { Routes, Route } from "react-router-dom";

import "./globals.css";
import AuthLayout from "./_auth/AuthLayout.js";
import SigninForm from "./_auth/forms/SigninForm.js";
import SignupForm from "./_auth/forms/SignupForm.js";
import RootLayout from "./_root/RootLayout.js";
import { Home } from "./_root/pages";

/*import Welcome from './Components/Welcome/Welcome.js'*/

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
				</Route>
			</Routes>
		</main>
	);
};

export default App;
