import React, { useEffect, useState } from "react";
import "./project.scss";
import ProjectItem from "~/components/ProjectItem/ProjectItem";
import axios from "axios";
import ModalNewProject from "../Modal/NewProject/ModalNewProject";

interface ProjectItem {
	id: string;
	name: string;
	date: string;
	creator: string;
	members: string[];
}

function Project(props: any) {
	const [projectItems, setProjectItems] = useState<ProjectItem[] | null>();

	useEffect(() => {
		handleGetProjectHasUser();
	}, []);

	const handleGetProjectHasUser = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects/projectsHasUser`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${props.token}`,
				},
			});

			const data = response.data;
			if (data.status) {
				console.log(data.result);
				setProjectItems(data.result);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
				props.setShowError(true);
			} else if (error.request) {
				console.error("Error:", error.request);
				props.setErrorMessage("Failed to connect to server.");
				props.setShowError(true);
			} else {
				console.error("Error:", error.message);
				props.setErrorMessage("An unexpected error occurred: " + error.message);
				props.setShowError(true);
			}
			props.setLoading(false);
		}
	};

	

	return (
		<div className="project">
			<div className="project__list">
				{projectItems &&
					projectItems.map((item) => (
						<ProjectItem
							key={item.id}
							{...item}
							token={props.token}
							setErrorMessage={(message: string) => props.setErrorMessage(message)}
							setShowError={(isShow: boolean) => props.setShowError(isShow)}
							setLoading={(isLoading: boolean) => props.setLoading(isLoading)}
							hide={() => props.hide()}
							showManagement={() => props.showManagement()}
							setProjectName={(name: string) => props.setProjectName(name)}
						/>
					))}
			</div>
			{props.showModalNewProject ? <ModalNewProject token={props.token} close={() => props.closeModalNewProject()} handleGetProjectHasUser={handleGetProjectHasUser} /> : ""}
		</div>
	);
}

export default Project;
