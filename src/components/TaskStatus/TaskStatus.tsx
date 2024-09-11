import React from "react";
import "./taskStatus.scss";
import Task from "~/components/Task/Task";

function TaskStatus(props: any) {
	return (
		<div className={props.statusClassName + "-section section"}>
			<h2 className="name">{props.statusName}</h2>
			{/* <i className="fa-solid fa-plus add"></i> */}
			<div className="list">
				{props.tasks.map((task: any) => (
					<Task key={task.id} {...task} token={props.token} setErrorMessage={(message: string) => props.setErrorMessage(message)} setShowError={(isShow: boolean) => props.setShowError(isShow)} setLoading={(isLoading: boolean) => props.setLoading(isLoading)} />
				))}
			</div>
		</div>
	);
}

export default TaskStatus;
