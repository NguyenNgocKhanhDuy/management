import React, { useEffect, useState } from "react";
import TaskStatus from "~/components/TaskStatus/TaskStatus";
import "./management.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "~/store/store";
import Loading from "../Loading/Loading";

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

function Management() {
	const token = useSelector((state: RootState) => state.user.token);
	const idProject = useSelector((state: RootState) => state.project.idProject);
	const [loading, setLoading] = useState(false);

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
				setLoading(false);
				setTasks(data.result);
				console.log(data.result);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message);
			} else if (error.request) {
				console.error("Error:", error.request);
			} else {
				console.error("Error:", error.message);
			}
			setLoading(false);
		}
	};

	return (
		<div className="management">
			<TaskStatus statusName="To Do List" statusClassName="todo-list" tasks={tasks?.filter((task: Task) => task.status == 0)} />
			<TaskStatus statusName="Pending" statusClassName="pending" tasks={tasks?.filter((task: Task) => task.status == 1)} />
			<TaskStatus statusName="Done" statusClassName="done" tasks={tasks?.filter((task: Task) => task.status == 2)} />
			{loading ? <Loading loading={loading} /> : ""}
		</div>
	);
}

export default Management;
