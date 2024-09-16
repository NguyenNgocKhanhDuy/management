import React, { useState } from "react";
import "./modalNewProject.scss";
import Loading from "~/components/Loading/Loading";
import axios from "axios";

function ModalNewProject(props: any) {
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const token = props.token;

	const handleNewProject = async (event: any) => {
		event.preventDefault();
		setLoading(true);

		const nameInput = (event.target as HTMLFormElement).elements.namedItem("project") as HTMLInputElement;

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/projects/addProject`,
				{
					name: nameInput.value,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const data = response.data;
			if (data.status) {
				setLoading(false);
				props.handleGetProjectHasUser();
				props.close();
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				setErrorMessage(error.response.data.message || error.response.data.error);
			} else if (error.request) {
				console.error("Error:", error.request);
				setErrorMessage("Failed to connect to server.");
			} else {
				console.error("Error:", error.message);
				setErrorMessage("An unexpected error occurred: " + error.message);
			}
			console.log(token);

			setLoading(false);
		}
	};

	return (
		<div className="modal__newProject">
			<div className="modal__newProject-container">
				<i className="fa-solid fa-xmark modal__newProject-close" onClick={() => props.close()}></i>
				<h2 className="modal__newProject-title">New Project</h2>
				<form className="modal__newProject-form" onSubmit={handleNewProject}>
					<div className="modal__newProject-holder">
						{/* <i className="fa-solid fa-envelope"></i> */}
						<input type="text" name="project" placeholder="Enter your project name" className="modal__newProject-input" />
					</div>
					<div className={(errorMessage == "" ? "modal__newProject-error--hidden" : "") + " modal__newProject-error"}>
						<p className="modal__newProject-error-message">{errorMessage}</p>
					</div>
					<button className="modal__newProject-btn">Create</button>
				</form>
			</div>
			{loading ? <Loading loading={loading} /> : ""}
		</div>
	);
}

export default ModalNewProject;
