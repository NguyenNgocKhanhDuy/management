import React from "react";
import blackImg from "../assets/img/black.jpg";
import "../assets/style/taskStatus.scss";
import Task from "./Task";

function TaskStatus(props: any) {
	return (
		<div className={props.statusClassName + "-section section"}>
			<h2 className="name">{props.statusName}</h2>
			<i className="fa-solid fa-plus add"></i>
			<div className="list">
				<Task />
			</div>
		</div>
	);
}

export default TaskStatus;
