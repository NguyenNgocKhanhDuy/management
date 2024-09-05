import React, { useRef, useState } from "react";
import "../assets/style/verifyEmailPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { setForgotPassword } from "../store/userSlice";

function VerifyEmailPage() {
	const [errorMessage, setErrorMessage] = useState("");
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const email = useSelector((state: RootState) => state.user.email);
	const isForgotPassword = useSelector((state: RootState) => state.user.isForgotPass);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleInput = (e: any, index: number) => {
		const input = e.target as HTMLInputElement;
		if (input.value.length > 1) {
			input.value = input.value.slice(0, 1);
		}

		if (input.value.length == 1 && index < inputRefs.current.length) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleVerify = async () => {
		const verificationCode = inputRefs.current.map((ref) => ref?.value).join("");
		const requestBody = {
			emai: email,
			code: verificationCode,
		};

		const response = await fetch("http://localhost:8080/users/sendCodeToUser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
		});

		if (!response.ok) {
			console.error("Network response was not ok");
			return;
		}

		const data = await response.json();

		if (!data.status) {
			console.log("ERROR", data);
			setErrorMessage("Failed from api");
		} else {
			if (data.valid) {
				if (isForgotPassword) {
					dispatch(setForgotPassword(false));
					navigate("/newPass");
				} else {
					navigate("/login");
				}
			} else {
				setErrorMessage("Incorrect verify code");
			}
		}
	};

	return (
		<div className="verify">
			<h2 className="verify__title">Verify Email</h2>
			<p className="verify__subtitle">We've sent code to your email. Please check and input code to verity your email</p>
			<div className="verify__form">
				{Array(5)
					.fill(0)
					.map((_, index) => (
						<input type="number" key={index} maxLength={1} className="verify__input" onInput={(e) => handleInput(e, index)} ref={(el) => (inputRefs.current[index] = el)} />
					))}
			</div>
			<div className={(errorMessage == "" ? "verify__error--hidden" : "") + " verify__error"}>
				<p className="verify__error-message">{errorMessage}</p>
			</div>
			<button className="verify__btn" onClick={handleVerify}>
				Verify
			</button>
			<div className="verify__resend">
				Don't receive code? <span className="verify__resend-link">Resend Code</span>
			</div>
		</div>
	);
}

export default VerifyEmailPage;
