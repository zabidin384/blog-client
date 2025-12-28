import "./index.css";
import { Suspense } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { ToastContainer } from "react-toastify";
import Loading from "./components/Loading.jsx";
import { Homepage, LoginPage, MainLayout, PostListPage, RegisterPage, SinglePostPage, WritePage } from "./router.js";

// Pages

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key!");
}

const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: (
					<Suspense fallback={<Loading />}>
						<Homepage />
					</Suspense>
				),
			},
			{
				path: "/posts",
				element: (
					<Suspense fallback={<Loading />}>
						<PostListPage />
					</Suspense>
				),
			},
			{
				path: "/saved-posts",
				element: (
					<Suspense fallback={<Loading />}>
						<PostListPage type="saved" />
					</Suspense>
				),
			},
			{
				path: "/:slug",
				element: (
					<Suspense fallback={<Loading />}>
						<SinglePostPage />
					</Suspense>
				),
			},
			{
				path: "/write",
				element: (
					<Suspense fallback={<Loading />}>
						<WritePage />
					</Suspense>
				),
			},
			{
				path: "/login",
				element: (
					<Suspense fallback={<Loading />}>
						<LoginPage />
					</Suspense>
				),
			},
			{
				path: "/register",
				element: (
					<Suspense fallback={<Loading />}>
						<RegisterPage />
					</Suspense>
				),
			},
			{
				path: "/:slug",
				element: (
					<Suspense fallback={<Loading />}>
						<PostListPage />
					</Suspense>
				),
			},
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
