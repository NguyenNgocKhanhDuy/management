import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const Welcome = () => {
	const location = useLocation();

	return <Navigate to={`/login${location.search}`} />;
};

export default Welcome;
