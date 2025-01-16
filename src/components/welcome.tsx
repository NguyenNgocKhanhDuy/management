import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const Welcome = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const invite = queryParams.get("invite");

	if (invite == "yes") {
		const token = queryParams.get("token");
		return <Navigate to={`/confirm?token=${token}`} />;
	} else {
		<Navigate to={`/login`} />;
	}
};

export default Welcome;
