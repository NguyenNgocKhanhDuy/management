import React, { useEffect, useState } from "react";
import TaskStatus from "~/components/TaskStatus/TaskStatus";
import "./management.scss";
import axios from "axios";
import Loading from "../Loading/Loading";
import { getProjectId } from "~/store/localStorage";
import ModalCreateTask from "../Modal/CreateTask/ModalCreateTask";

interface Task {
	creator: string;
	date: string;
	deadline: Date;
	id: string;
	members: string[];
	name: string;
	project: string;
	status: number;
}

function Management(props: any) {
	const token = props.token;
	const idProject = getProjectId();

	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		handleGetTaskOfProject();
	}, []);

	const handleGetTaskOfProject = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tasks/tasksOfProject/${idProject}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			const data = response.data;
			if (data.status) {
				console.log(data.result);
				setTasks(data.result);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message);
			} else if (error.request) {
				console.error("Error:", error.request);
			} else {
				console.error("Error:", error.message);
			}
			props.setLoading(false);
			props.isSelectProject();
			props.setShowError(true);
		}
	};

	return (
		<div className="management">
			<TaskStatus
				token={props.token}
				statusName="To Do List"
				statusClassName="todo-list"
				tasks={tasks?.filter((task: Task) => task.status == 0)}
				setErrorMessage={(message: string) => props.setErrorMessage(message)}
				setShowError={(isShow: boolean) => props.setShowError(isShow)}
				setLoading={(isLoading: boolean) => props.setLoading(isLoading)}
			/>
			<TaskStatus
				token={props.token}
				statusName="Pending"
				statusClassName="pending"
				tasks={tasks?.filter((task: Task) => task.status == 1)}
				setErrorMessage={(message: string) => props.setErrorMessage(message)}
				setShowError={(isShow: boolean) => props.setShowError(isShow)}
				setLoading={(isLoading: boolean) => props.setLoading(isLoading)}
			/>
			<TaskStatus
				token={props.token}
				statusName="Done"
				statusClassName="done"
				tasks={tasks?.filter((task: Task) => task.status == 2)}
				setErrorMessage={(message: string) => props.setErrorMessage(message)}
				setShowError={(isShow: boolean) => props.setShowError(isShow)}
				setLoading={(isLoading: boolean) => props.setLoading(isLoading)}
			/>
			{props.showModalCreateTask ? <ModalCreateTask close={() => props.closeModalCreateTask()} /> : ""}
		</div>
	);
}

export default Management;
