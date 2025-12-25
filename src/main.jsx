import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { ToastContainer } from "react-toastify";

// Pages
import Homepage from "./routes/Homepage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import PostListPage from "./routes/PostListPage.jsx";
import RegisterPage from "./routes/RegisterPage.jsx";
import SinglePostPage from "./routes/SinglePostPage.jsx";
import WritePage from "./routes/WritePage.jsx";

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key!");
}

const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{ path: "/", element: <Homepage /> },
			{ path: "/posts", element: <PostListPage /> },
			{ path: "/:slug", element: <SinglePostPage /> },
			{ path: "/write", element: <WritePage /> },
			{ path: "/login", element: <LoginPage /> },
			{ path: "/register", element: <RegisterPage /> },
			{ path: "/:slug", element: <PostListPage /> },
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<ToastContainer position="top-right" />
			</QueryClientProvider>
		</ClerkProvider>
	</StrictMode>
);
