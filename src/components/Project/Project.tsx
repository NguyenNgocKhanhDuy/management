import React from "react";
import "./project.scss";
import ProjectItem from "~/components/ProjectItem/ProjectItem";

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
