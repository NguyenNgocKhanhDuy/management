import React from "react";
import "./modalConfirm.scss";

function ModalConfirm(props: any) {
	const handleSelect = (isSelectProject: boolean) => {
		props.close();
		props.setConfirmSelect(isSelectProject);
	};

	return (
		<div className="modal">
			<div className="modal__container">
				<h2 className="modal__title">Warning</h2>
				<p className="modal__message">{props.message}</p>
				<div className="modal__wrap-btn">
					<button className="modal__btn" onClick={() => handleSelect(false)}>
						No
					</button>
					<button className="modal__btn" onClick={() => handleSelect(true)}>
						Yes
					</button>
				</div>
			</div>
		</div>
	);
}

export default ModalConfirm;
