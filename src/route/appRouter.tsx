import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import VerifyEmailPage from "../pages/VerifyEmailPage/VerifyEmailPage";
import NewPass from "../pages/NewPass/NewPass";
import Profile from "~/components/Profile/Profile";
import Project from "~/components/Project/Project";
import Management from "~/components/Management/Management";
import Confirm from "~/pages/Confirm/Confirm";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Navigate to="/login" />,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/register",
				element: <RegisterPage />,
			},
			{
				path: "/verifyEmail",
				element: <VerifyEmailPage />,
			},
			{
				path: "/newPass",
				element: <NewPass />,
			},
			{
				path: "/confirm",
				element: <Confirm />,
			},
			{
				path: "/home",
				element: <HomePage />,
				children: [
					{
						path: "project",
						element: <Project />,
					},
					{
						path: "task",
						element: <Management />,
					},
					{
						path: "profile",
						element: <Profile />,
					},
				],
			},
		],
	},
]);
