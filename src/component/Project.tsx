import React from "react";
import "../assets/style/project.scss";
import blackImg from "../assets/img/black.jpg";
import ProjectItem from "./ProjectItem";

function Project() {
	return (
		<div className="project">
			<div className="project__list">
				<ProjectItem title={"Project 1"} />
				<ProjectItem title={"Project 2"} />
				<ProjectItem title={"Project 3"} />
				<ProjectItem title={"Project 4"} />
				<ProjectItem title={"Project 5"} />
				<ProjectItem title={"Project 5"} />
				<ProjectItem title={"Project 5"} />
			</div>
		</div>
	);
}

export default Project;
