import React, { useState } from "react";
import "./modalForgotPassword.scss";
import { Link, useNavigate } from "react-router-dom";
import { handleCheckEmail } from "~/utils/validation";
import Loading from "~/components/Loading/Loading";
import axios from "axios";
import { saveEmail, setIsForgotPass } from "~/store/localStorage";

function ModalForgotPassword(props: any) {
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setLoading(true);
		const emailInput = (event.target as HTMLFormElement).elements.namedItem("email") as HTMLInputElement;
		if (!handleCheckEmail(emailInput.value)) {
			setErrorMessage("Invalid email format");
			setLoading(false);
		} else {
			try {
				const response = await axios.post(
					`${process.env.REACT_APP_API_BASE_URL}/users/sendCodeToUser`,
					{
						email: emailInput.value,
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
					setIsForgotPass(true);
					navigate("/verifyEmail");
				}
			} catch (error: any) {
				if (error.response) {
					console.error("Error:", error.response.data.message);
					setErrorMessage(error.response.data.message);
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
		<div className="modal">
			<div className="modal__container">
				<i className="fa-solid fa-xmark modal__close" onClick={() => props.close()}></i>
				<h2 className="modal__title">Forgot Password</h2>
				<form className="modal__form" onSubmit={handleSubmit}>
					<div className="modal__holder">
						<i className="fa-solid fa-envelope"></i>
						<input type="email" name="email" placeholder="Enter your email" className="modal__input" onClick={() => setErrorMessage("")} />
					</div>
					<div className={(errorMessage == "" ? "modal__error--hidden" : "") + " modal__error"}>
						<p className="modal__error-message">{errorMessage}</p>
					</div>
					<button className="modal__btn">Submit</button>
				</form>
				<p className="modal__register">
					Don't have an account?{" "}
					<Link to={"/register"} className="modal__register-link">
						Sign Up
					</Link>
				</p>
			</div>
			{loading ? <Loading loading={loading} /> : ""}
		</div>
	);
}

export default ModalForgotPassword;
