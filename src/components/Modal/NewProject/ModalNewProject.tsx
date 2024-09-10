import React from "react";
import "./modalNewProject.scss";

function ModalNewProject(props: any) {
	return (
		<div className="modal__newProject">
			<div className="modal__newProject-container">
				<i className="fa-solid fa-xmark modal__newProject-close" onClick={() => props.close()}></i>
				<h2 className="modal__newProject-title">New Project</h2>
				<form className="modal__newProject-form">
					<div className="modal__newProject-holder">
						{/* <i className="fa-solid fa-envelope"></i> */}
						<input type="text" placeholder="Enter your project name" className="modal__newProject-input" />
					</div>

					<button className="modal__newProject-btn">Create</button>
				</form>
			</div>
		</div>
	);
}

export default ModalNewProject;
