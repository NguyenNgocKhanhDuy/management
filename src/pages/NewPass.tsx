import React, { useState } from "react";
import "../assets/style/newPass.scss";

function NewPass() {
	const [errorMessage, setErrorMessage] = useState("");

	const handleCheckPassword = (password: string) => {
		return password.length >= 8;
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const passInput = (event.target as HTMLFormElement).elements.namedItem("password") as HTMLInputElement;
		const passConfirmInput = (event.target as HTMLFormElement).elements.namedItem("password-confirm") as HTMLInputElement;

		if (!handleCheckPassword(passInput.value)) {
			setErrorMessage("Password must be at least 8 characters");
		}

		if (passInput.value != passConfirmInput.value) {
			setErrorMessage("Incorrect password and confirmation password");
		}
	};

	return (
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
		</div>
	);
}

export default NewPass;
