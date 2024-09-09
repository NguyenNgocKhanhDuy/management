import React from "react";
import "./modalError.scss";
import { useNavigate } from "react-router-dom";

function ModalError(props: any) {
	const navigate = useNavigate();

	const handleNavigateToLogin = () => {
		navigate("/login");
	};

	return (
		<div className="modal">
			<div className="modal__container">
				<h2 className="modal__title">Error</h2>
				<p className="modal__message">{props.errorMessage}</p>
				<button className="modal__btn" onClick={handleNavigateToLogin}>
					Login
				</button>
			</div>
		</div>
	);
}

export default ModalError;
