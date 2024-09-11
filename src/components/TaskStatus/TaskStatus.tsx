import React from "react";
import "./taskStatus.scss";
import Task from "~/components/Task/Task";
import { useDrop } from "react-dnd";

function TaskStatus(props: any) {
	return (
		<div className={props.statusClassName + "-section section"}>
			<h2 className="name">{props.statusName}</h2>
			{/* <i className="fa-solid fa-plus add"></i> */}
			<div className="list">
				{props.tasks.map((task: any) => (
					<Task key={task.id} {...task} />
				))}
			</div>
		</div>
	);
}

export default TaskStatus;
