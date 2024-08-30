import React, { useState } from "react";
import "../assets/style/loginPage.scss";
import { Link } from "react-router-dom";

function LoginPage() {
	const [errorMessage, setErrorMessage] = useState("");

	const handleCheckEmail = (email: string) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const handleCheckPassword = (password: string) => {
		return password.length >= 8;
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const emailInput = (event.target as HTMLFormElement).elements.namedItem("email") as HTMLInputElement;
		const passInput = (event.target as HTMLFormElement).elements.namedItem("password") as HTMLInputElement;
		if (!handleCheckEmail(emailInput.value)) {
			setErrorMessage("Invalid email format");
		}

		if (!handleCheckPassword(passInput.value)) {
			setErrorMessage("Password must be at least 8 characters");
		}
	};

	return (
		<div className="login">
			<h2 className="login__title">Welcome back!</h2>
			<p className="login__subtitle">We're glad to see you again!</p>
			<form className="login__form" onSubmit={handleSubmit}>
				<div className="login__holder">
					<i className="fa-solid fa-envelope"></i>
					<input type="email" name="email" className="login__input login__input-email" placeholder="Email" onClick={() => setErrorMessage("")} />
				</div>
				<div className="login__holder">
					<i className="fa-solid fa-lock"></i>
					<input type="password" name="password" className="login__input login__input-password" placeholder="Password" onClick={() => setErrorMessage("")} />
				</div>
				<div className={(errorMessage == "" ? "login__error--hidden" : "") + " login__error"}>
					<p className="login__error-message">{errorMessage}</p>
				</div>
				<button className="login__btn">Login</button>
			</form>
			<p className="login__forgot-password">Forgot Password?</p>
			<p className="login__sign-up">
				Don't have an account?{" "}
				<Link to={"/register"} className="login__sign-up-link">
					Sign Up
				</Link>
			</p>
		</div>
	);
}

export default LoginPage;
