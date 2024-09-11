import React from "react";
import "./modalError.scss";
import { useNavigate } from "react-router-dom";

function ModalError(props: any) {
	const navigate = useNavigate();

	const handleSubmit = () => {
		if (props.isSelectProject) {
			props.hide();
			props.showProject();
			props.close();
		} else {
			navigate("/login");
		}
	};

	return (
		<div className="modal">
			<div className="modal__container">
				<h2 className="modal__title">Warning</h2>
				<p className="modal__message">{props.isSelectProject ? "Please select project to see task" : props.message}</p>
				<button className="modal__btn" onClick={handleSubmit}>
					{props.isSelectProject ? "Go to Project" : "Login"}
				</button>
			</div>
		</div>
	);
}

export default ModalError;
