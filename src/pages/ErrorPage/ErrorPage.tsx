import React from "react";
import { Link } from "react-router-dom";
import "./errorPage.scss";

function ErrorPage() {
	return (
		<div className="error">
			<div className="error__wrap">
				<div className="error__title">Error</div>
				<div className="error__subtitle">404 Page Not Found</div>
				<div className="error__description">The page you're looking for might have been moved or deleted.</div>
				<Link to={"/login"} className="error__link">
					Go to Login
				</Link>
			</div>
		</div>
	);
}

export default ErrorPage;
