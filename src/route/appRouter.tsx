import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import VerifyEmailPage from "../pages/VerifyEmailPage";
import NewPass from "../pages/NewPass";

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
				element: <RegisterPage/>,
			},
			{
				path: "/verifyEmail",
				element: <VerifyEmailPage/>,
			},
			{
				path: "/newPass",
				element: <NewPass/>,
			},
			{
				path: "/home",
				element: <HomePage />,
			},
		],
	},
]);
