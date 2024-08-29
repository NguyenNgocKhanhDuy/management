import React from "react";
import "../assets/style/loginPage.scss";

function LoginPage() {
	const handleSubmit = (event: any) => {
		event.preventDefault();
		console.log("Form submitted");
	};

	return (
		<div className="login">
			<h2 className="login__title">Welcome back!</h2>
			<p className="login__subtitle">We're glad to see you again!</p>
			<form className="login__form" onSubmit={handleSubmit}>
				<div className="login__holder">
					<i className="fa-solid fa-envelope"></i>
					<input type="email" name="" id="" className="login__input login__input-email" placeholder="Email" />
				</div>
				<div className="login__holder">
					<i className="fa-solid fa-lock"></i>
					<input type="password" name="" id="" className="login__input login__input-password" placeholder="Password" />
				</div>
				<div className="login__error login__error--hidden">
					<p className="login__error-message">Email has already been used</p>
				</div>
				<button className="login__btn">Login</button>
			</form>
			<p className="login__forgot-password">Forgot Password?</p>
			<p className="login__sign-up">
				Don't have an account? <span className="login__sign-up-link">Sign Up</span>
			</p>
		</div>
	);
}

export default LoginPage;
