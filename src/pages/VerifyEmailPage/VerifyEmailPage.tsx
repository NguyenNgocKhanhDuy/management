import React, { useEffect, useRef, useState } from "react";
import "./verifyEmailPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store/store";
import { useNavigate } from "react-router-dom";
import { setForgotPassword } from "~/store/userSlice";
import Loading from "~/components/Loading/Loading";
import axios from "axios";

function VerifyEmailPage() {
	const [errorMessage, setErrorMessage] = useState("");
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const email = useSelector((state: RootState) => state.user.email);
	const isForgotPassword = useSelector((state: RootState) => state.user.isForgotPass);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		inputRefs.current[0]?.focus();
	}, []);

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
		setLoading(true);
		const verificationCode = inputRefs.current.map((ref) => ref?.value).join("");

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/users/verifyCode`,
				{
					email: email,
					code: verificationCode,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = response.data;
			if (data.status) {
				if (data.result.valid) {
					if (isForgotPassword) {
						dispatch(setForgotPassword(false));
						navigate("/newPass");
					} else {
						navigate("/login");
					}
				} else {
					setErrorMessage("Incorrect verify code");
					setLoading(false);
				}
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
	};

	const handleResendCode = async () => {
		inputRefs.current.map((ref) => {
			if (ref) ref.value = "";
		});
		setErrorMessage("");
		setLoading(true);

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/users/sendCodeToUser`,
				{
					email: email,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = response.data;
			if (data.status) {
				inputRefs.current[0]?.focus();
				setLoading(false);
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
	};

	return (
		<div className="c-wrap">
			<div className="verify">
				<h2 className="verify__title">Verify Email</h2>
				<p className="verify__subtitle">We've sent code to {email}. Please check and input code to verity your email</p>
				<div className="verify__form">
					{Array(6)
						.fill(0)
						.map((_, index) => (
							<input type="number" key={index} maxLength={1} className="verify__input" onInput={(e) => handleInput(e, index)} ref={(el) => (inputRefs.current[index] = el)} onClick={() => setErrorMessage("")} />
						))}
				</div>
				<div className={(errorMessage == "" ? "verify__error--hidden" : "") + " verify__error"}>
					<p className="verify__error-message">{errorMessage}</p>
				</div>
				<button className="verify__btn" onClick={handleVerify}>
					Verify
				</button>
				<div className="verify__resend">
					Don't receive code?{" "}
					<span className="verify__resend-link" onClick={handleResendCode}>
						Resend Code
					</span>
				</div>
				{loading ? <Loading loading={loading} /> : ""}
			</div>
		</div>
	);
}

export default VerifyEmailPage;
