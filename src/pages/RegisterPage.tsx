import React, { useState } from "react";
import "../assets/style/register.scss";
import { Link } from "react-router-dom";

function RegisterPage() {
	const [errorMessage, setErrorMessage] = useState("");

	const handleCheckEmail = (email: string) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const handleCheckUsername = (username: string) => {
		return username.length > 0;
	};

	const handleCheckPassword = (password: string) => {
		return password.length >= 8;
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const emailInput = (event.target as HTMLFormElement).elements.namedItem("email") as HTMLInputElement;
		const usernameInput = (event.target as HTMLFormElement).elements.namedItem("username") as HTMLInputElement;
		const passInput = (event.target as HTMLFormElement).elements.namedItem("password") as HTMLInputElement;

		if (!handleCheckEmail(emailInput.value)) {
			setErrorMessage("Invalid email format");
		}

		if (!handleCheckUsername(usernameInput.value)) {
			setErrorMessage("Please enter your username");
		}

		if (!handleCheckPassword(passInput.value)) {
			setErrorMessage("Password must be at least 8 characters");
		}

		const requestBody = {
			email: emailInput.value,
			username: usernameInput.value,
			password: passInput.value,
		};

		try {
			const response = await fetch("http://localhost:8080/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestBody),
			});

			if (!response.ok) {
				setErrorMessage("Network response was not ok");
			}

			const data = await response.json();
			console.log("Success:", data);
			setErrorMessage("");
		} catch (error) {
			console.error("Error:", error);
			setErrorMessage("Failed to register. Please try again later.");
		}
	};

	return (
		<div className="register">
			<h2 className="register__title">Create Your Account</h2>
			<p className="register__subtitle">Join us and start your journey today!</p>
			<form className="register__form" onSubmit={handleSubmit}>
				<div className="register__holder">
					<i className="fa-solid fa-envelope"></i>
					<input type="email" name="email" className="register__input register__input-email" placeholder="Email" onClick={() => setErrorMessage("")} />
				</div>
				<div className="register__holder">
					<i className="fa-solid fa-user"></i>
					<input type="text" name="username" className="register__input register__input-username" placeholder="Username" onClick={() => setErrorMessage("")} />
				</div>
				<div className="register__holder">
					<i className="fa-solid fa-lock"></i>
					<input type="password" name="password" className="register__input register__input-password" placeholder="Password" onClick={() => setErrorMessage("")} />
				</div>
				<div className={(errorMessage == "" ? "register__error--hidden" : "") + " register__error"}>
					<p className="register__error-message">{errorMessage}</p>
				</div>
				<button className="register__btn">register</button>
			</form>
			<p className="register__login">
				Already have an account?{" "}
				<Link to={"/login"} className="register__login-link">
					Log in
				</Link>
			</p>
		</div>
	);
}

export default RegisterPage;
