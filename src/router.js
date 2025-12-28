import React from "react";

export const MainLayout = React.lazy(() => import("./layouts/MainLayout.jsx"));
export const Homepage = React.lazy(() => import("./routes/Homepage.jsx"));
export const LoginPage = React.lazy(() => import("./routes/LoginPage.jsx"));
export const PostListPage = React.lazy(() => import("./routes/PostListPage.jsx"));
export const RegisterPage = React.lazy(() => import("./routes/RegisterPage.jsx"));
export const SinglePostPage = React.lazy(() => import("./routes/SinglePostPage.jsx"));
export const WritePage = React.lazy(() => import("./routes/WritePage.jsx"));
