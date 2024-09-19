import React, { useEffect, useState } from "react";
import "./newPass.scss";
import { useNavigate } from "react-router-dom";
import Loading from "~/components/Loading/Loading";
import axios from "axios";
import { getEmail, removeIsForgotPass } from "~/store/localStorage";

function NewPass() {
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();
	const email = getEmail();
	const [loading, setLoading] = useState(false);

	const handleCheckPassword = (password: string) => {
		return password.length >= 8;
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setLoading(true);
		const passInput = (event.target as HTMLFormElement).elements.namedItem("password") as HTMLInputElement;
		const passConfirmInput = (event.target as HTMLFormElement).elements.namedItem("password-confirm") as HTMLInputElement;

		if (!handleCheckPassword(passInput.value)) {
			setErrorMessage("Password must be at least 8 characters");
			setLoading(false);
		} else if (passInput.value != passConfirmInput.value) {
			setErrorMessage("Incorrect password and confirmation password");
			setLoading(false);
		} else {
			try {
				const response = await axios.post(
					`${process.env.REACT_APP_API_BASE_URL}/users/updatePassword`,
					{
						email: email,
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
					removeIsForgotPass();
					navigate("/login");
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
			<div className="newPass">
				<h2 className="newPass__title">New Password</h2>
				<p className="newPass__subtitle">Please enter your password</p>
				<form className="newPass__form" onSubmit={handleSubmit}>
					<div className="newPass__holder">
						<i className="fa-solid fa-lock"></i>
						<input type="password" name="password" className="newPass__input" placeholder="Password" onClick={() => setErrorMessage("")} />
					</div>
					<div className="newPass__holder">
						<i className="fa-solid fa-lock"></i>
						<input type="password" name="password-confirm" className="newPass__input" placeholder="Cofirm Password" onClick={() => setErrorMessage("")} />
					</div>
					<div className={(errorMessage == "" ? "newPass__error--hidden" : "") + " newPass__error"}>
						<p className="newPass__error-message">{errorMessage}</p>
					</div>
					<button className="newPass__btn">Save</button>
				</form>
				{loading ? <Loading loading={loading} /> : ""}
			</div>
		</div>
	);
}

export default NewPass;
