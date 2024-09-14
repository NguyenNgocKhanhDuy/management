import React from "react";
import "./taskStatus.scss";
import Task from "~/components/Task/Task";
import { Droppable } from "react-beautiful-dnd";

function TaskStatus(props: any) {
	return (
		<Droppable droppableId={props.status}>
			{(provided) => (
				<div className={props.statusClassName + "-section section"} {...provided.droppableProps} ref={provided.innerRef}>
					<h2 className="name">{props.statusName}</h2>
					<div className="list">
						{props.tasks.map((task: any) => (
							<Task
								key={task.id}
								{...task}
								token={props.token}
								setErrorMessage={(message: string) => props.setErrorMessage(message)}
								setShowError={(isShow: boolean) => props.setShowError(isShow)}
								setLoading={(isLoading: boolean) => props.setLoading(isLoading)}
								handleGetTaskOfProject={() => props.handleGetTaskOfProject()}
							/>
						))}
					</div>
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
}

export default TaskStatus;
