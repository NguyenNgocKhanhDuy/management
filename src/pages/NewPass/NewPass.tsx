import React, { useEffect, useState } from "react";
import "./newPass.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store/store";
import { setForgotPassword } from "~/store/userSlice";
import Loading from "~/components/Loading/Loading";

function NewPass() {
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();
	const email = useSelector((state: RootState) => state.user.email);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		document.body.classList.add("body-center");

		return () => {
			document.body.classList.remove("body-center");
		};
	}, []);

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
			const requestBody = {
				email: email,
				password: passInput.value,
			};

			try {
				const response = await fetch("http://localhost:8080/users/updatePassword", {
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
					console.log("ERROR", data);
					setErrorMessage(data.message);
					setLoading(false);
				} else {
					dispatch(setForgotPassword(false));
					navigate("/login");
				}
			} catch (error) {
				console.error("Error:", error);
				setErrorMessage("Failed to get password. Please try again later.");
				setLoading(false);
			}
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
			{loading ? <Loading loading={loading} /> : ""}
		</div>
	);
}

export default NewPass;
