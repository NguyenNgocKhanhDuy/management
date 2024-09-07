import React, { useState } from "react";
import "../assets/style/register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveEmail } from "../store/userSlice";
import Loading from "../components/Loading";

function RegisterPage() {
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();
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
			const requestBody = {
				email: emailInput.value,
				username: usernameInput.value,
				password: passInput.value,
			};

			try {
				const response = await fetch("http://localhost:8080/users/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(requestBody),
				});

				if (!response.ok) {
					setErrorMessage("Network response was not ok");
					setLoading(false);
				}

				const data = await response.json();
				console.log("Success:", data);
				if (!data.status) {
					console.log("ERROR", data);
					setErrorMessage(data.message);
					setLoading(false);
				} else {
					dispatch(saveEmail(emailInput.value));
					navigate("/verifyEmail");
				}
			} catch (error) {
				console.error("Error:", error);
				setErrorMessage("Failed to register. Please try again later.");
				setLoading(false);
			}
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
			{loading ? <Loading loading={loading} /> : ""}
		</div>
	);
}

export default RegisterPage;
