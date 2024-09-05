import React, { useState } from "react";
import "../assets/style/modalForgotPassword.scss";
import { Link, useNavigate } from "react-router-dom";
import { handleCheckEmail } from "../utils/validation";
import { useDispatch } from "react-redux";
import { saveEmail, setForgotPassword } from "../store/userSlice";

function ModalForgotPassword(props: any) {
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const emailInput = (event.target as HTMLFormElement).elements.namedItem("email") as HTMLInputElement;
		if (!handleCheckEmail(emailInput.value)) {
			setErrorMessage("Invalid email format");
		} else {
			const requestBody = {
				email: emailInput.value,
			};

			try {
				const response = await fetch("http://localhost:8080/users/sendCodeToUser", {
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

				if (!data.status) {
					console.log("ERROR", data);
					setErrorMessage("Failed from api");
				} else {
					dispatch(saveEmail(emailInput.value));
					dispatch(setForgotPassword(true));
					navigate("/verifyEmail");
				}
			} catch (error) {
				console.error("Error:", error);
				setErrorMessage("Failed to get password. Please try again later.");
			}
		}
	};

	return (
		<div className="modal">
			<div className="modal__container">
				<i className="fa-solid fa-xmark modal__close" onClick={() => props.close()}></i>
				<h2 className="modal__title">Forgot Password</h2>
				<form className="modal__form" onSubmit={handleSubmit}>
					<input type="email" name="email" placeholder="Enter your email" className="modal__input" onClick={() => setErrorMessage("")} />
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
		</div>
	);
}
