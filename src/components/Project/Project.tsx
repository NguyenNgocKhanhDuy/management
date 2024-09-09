import React, { useEffect, useState } from "react";
import "./project.scss";
import ProjectItem from "~/components/ProjectItem/ProjectItem";
import axios from "axios";

interface ProjectItem {
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
				setProjectItems(data.result);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message);
				props.setErrorMessage(error.response.data.message);
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
						<ProjectItem key={item.name} {...item} token={props.token} setErrorMessage={(message: string) => props.setErrorMessage(message)} setShowError={(isShow: boolean) => props.setShowError(isShow)} setLoading={(isLoading: boolean) => props.setLoading(isLoading)} />
					))}
			</div>
		</div>
	);
}

export default Project;
