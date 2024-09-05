import React, { useRef } from "react";
import "../assets/style/verifyEmailPage.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function VerifyEmailPage() {
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const email = useSelector((state: RootState) => state.user.email);

	const handleInput = (e: any, index: number) => {
		const input = e.target as HTMLInputElement;
		if (input.value.length > 1) {
			input.value = input.value.slice(0, 1);
		}

		if (input.value.length == 1 && index < inputRefs.current.length) {
			inputRefs.current[index + 1]?.focus();
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
			<button className="verify__btn">Verify</button>
			<div className="verify__resend">
				Don't receive code? <span className="verify__resend-link">Resend Code</span>
			</div>
		</div>
	);
}

export default VerifyEmailPage;
