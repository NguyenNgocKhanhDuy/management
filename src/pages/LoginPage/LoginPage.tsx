import React, { useEffect, useState } from "react";
import "./loginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import ModalForgotPassword from "~/components/Modal/ForgotPassword/ModalForgotPassword";
import { handleCheckEmail, handleCheckPassword } from "~/utils/validation";
import Loading from "~/components/Loading/Loading";
import { useDispatch } from "react-redux";
import { saveToken } from "~/store/userSlice";

function LoginPage() {
	const [errorMessage, setErrorMessage] = useState("");
	const [showModalForgotPass, setShowModalForgotPass] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		document.body.classList.add("body-center");

		return () => {
			document.body.classList.remove("body-center");
		};
	}, []);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setLoading(true);
		const emailInput = (event.target as HTMLFormElement).elements.namedItem("email") as HTMLInputElement;
		const passInput = (event.target as HTMLFormElement).elements.namedItem("password") as HTMLInputElement;
		if (!handleCheckEmail(emailInput.value)) {
			setErrorMessage("Invalid email format");
			setLoading(false);
		} else if (!handleCheckPassword(passInput.value)) {
			setErrorMessage("Password must be at least 8 characters");
			setLoading(false);
		} else {
			const requestBody = {
				email: emailInput.value,
				password: passInput.value,
			};

			try {
				const response = await fetch("http://localhost:8080/auth/login", {
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

				if (!data.status) {
					setErrorMessage(data.message);
					setLoading(false);
				} else {
					dispatch(saveToken(data.result.token));
					navigate("/home");
				}
			} catch (error) {
				console.error("Error:", error);
				setErrorMessage("Failed to login. Please try again later.");
				setLoading(false);
			}
		}
	};

	return (
		<div className="wrap">
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
				<p className="login__forgot-password" onClick={() => setShowModalForgotPass(!showModalForgotPass)}>
					Forgot Password?
				</p>
				<p className="login__sign-up">
					Don't have an account?{" "}
					<Link to={"/register"} className="login__sign-up-link">
						Sign Up
					</Link>
				</p>

				{showModalForgotPass ? <ModalForgotPassword close={() => setShowModalForgotPass(!showModalForgotPass)} /> : ""}
				{loading ? <Loading loading={loading} /> : ""}
			</div>
		</div>
	);
}

export default LoginPage;
