import React from "react";
import blackImg from "../assets/img/black.jpg";
import "../assets/style/taskStatus.scss";
import Task from "./Task";
import { useDrop } from "react-dnd";

function TaskStatus(props: any) {

	const [, drop] = useDrop(() => ({
			accept: "TASK",
			drop: (item: any) => props.moveTask(item.id, props.statusName),
	}));
	

	return (
		<div className={props.statusClassName + "-section section"} ref={drop}>
			<h2 className="name">{props.statusName}</h2>
			<i className="fa-solid fa-plus add"></i>
			<div className="list">
				{props.tasks.map((task: any) => (
					<Task key={task.id} {...task} />
				))}
			</div>
		</div>
	);
}

export default TaskStatus;
