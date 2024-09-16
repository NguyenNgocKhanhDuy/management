import React, { useEffect, useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import Loading from "~/components/Loading/Loading";
import axios from "axios";
import { saveEmail } from "~/store/localStorage";

function RegisterPage() {
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

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
		setLoading(true);
		const emailInput = (event.target as HTMLFormElement).elements.namedItem("email") as HTMLInputElement;
		const usernameInput = (event.target as HTMLFormElement).elements.namedItem("username") as HTMLInputElement;
		const passInput = (event.target as HTMLFormElement).elements.namedItem("password") as HTMLInputElement;

		if (!handleCheckEmail(emailInput.value)) {
			setErrorMessage("Invalid email format");
			setLoading(false);
		} else if (!handleCheckUsername(usernameInput.value)) {
			setErrorMessage("Please enter your username");
			setLoading(false);
		} else if (!handleCheckPassword(passInput.value)) {
			setErrorMessage("Password must be at least 8 characters");
			setLoading(false);
		} else {
			try {
				const response = await axios.post(
					`${process.env.REACT_APP_API_BASE_URL}/users/register`,
					{
						email: emailInput.value,
						username: usernameInput.value,
						password: passInput.value,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const data = response.data;

				if (data.status) {
					saveEmail(emailInput.value);
					navigate("/verifyEmail");
				}
			} catch (error: any) {
				if (error.response) {
					console.error("Error:", error.response.data.message || error.response.data.error);
					setErrorMessage(error.response.data.message || error.response.data.error);
				} else if (error.request) {
					setErrorMessage("Failed to connect to server.");
				} else {
					setErrorMessage("An unexpected error occurred: " + error.message);
				}
				setLoading(false);
			}
		}
	};

	return (
		<div className="c-wrap">
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
				{loading ? <Loading loading={loading} /> : ""}
			</div>
		</div>
	);
}

export default RegisterPage;
