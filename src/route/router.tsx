import React from "react";
import Home from "../pages/Home";
import App from "../App";
import { RouteObject, Navigate, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";

const routers: RouteObject[] = [
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
				path: "login",
				element: <Login />,
			},
			{
				path: "home",
				element: <Home />,
			},
		],
	},
];

export const router = createBrowserRouter(routers);
