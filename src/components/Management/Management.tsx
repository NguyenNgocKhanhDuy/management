import React, { useEffect, useState } from "react";
import TaskStatus from "~/components/TaskStatus/TaskStatus";
import "./management.scss";
import axios from "axios";
import Loading from "../Loading/Loading";
import { getProjectId } from "~/store/localStorage";
import ModalCreateTask from "../Modal/CreateTask/ModalCreateTask";
import Task from "../Task/Task";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

interface Task {
	creator: string;
	date: string;
	deadline: Date;
	id: string;
	members: string[];
	name: string;
	project: string;
	status: string;
	position: number;
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

	const handleSortByPosition = (tasks: Task[]) => {
		return tasks.sort((a, b) => a.position - b.position);
	};

	const handleOnDragEnd = async (result: DropResult) => {
		const { source, destination, draggableId } = result;
		console.log(result);

		if (!destination) return;

		if (source.index === destination.index && source.droppableId === destination.droppableId) return;

		const updateTasks = [...tasks];

		const [removeTask] = updateTasks.filter((task) => task.id === draggableId);
		const afterRemove = updateTasks.filter((task) => task.id !== draggableId);
		const taskInStatus = afterRemove.filter((task) => task.status === destination.droppableId);
		console.log(taskInStatus);
		taskInStatus.splice(destination.index, 0, removeTask);
		updateTasks.map((task) => {
			taskInStatus.map((task2, index) => {
				if (task.id === task2.id) {
					if (task.id === draggableId) {
						task.status = destination.droppableId;
					}
					task.position = index;
				}
			});
		});
		setTasks(updateTasks);
		console.log(updateTasks);

		try {
			const response = await axios.put(
				`${process.env.REACT_APP_API_BASE_URL}/tasks/updateTaskStatusAndPosition`,
				updateTasks.map((task) => ({
					id: task.id,
					status: task.status,
					position: task.position,
				})),
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const data = response.data;
			if (data.status) {
				console.log(updateTasks);
				handleGetTaskOfProject();
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
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<TaskStatus
					token={props.token}
					statusName="To Do List"
					status="todo"
					statusClassName="todo-list"
					tasks={handleSortByPosition(tasks?.filter((task: Task) => task.status == "todo"))}
					setErrorMessage={(message: string) => props.setErrorMessage(message)}
					setShowError={(isShow: boolean) => props.setShowError(isShow)}
					setLoading={(isLoading: boolean) => props.setLoading(isLoading)}
					handleGetTaskOfProject={handleGetTaskOfProject}
				/>
				<TaskStatus
					token={props.token}
					statusName="Pending"
					status="pending"
					statusClassName="pending"
					tasks={handleSortByPosition(tasks?.filter((task: Task) => task.status == "pending"))}
					setErrorMessage={(message: string) => props.setErrorMessage(message)}
					setShowError={(isShow: boolean) => props.setShowError(isShow)}
					setLoading={(isLoading: boolean) => props.setLoading(isLoading)}
					handleGetTaskOfProject={handleGetTaskOfProject}
				/>
				<TaskStatus
					token={props.token}
					statusName="Done"
					status="done"
					statusClassName="done"
					tasks={handleSortByPosition(tasks?.filter((task: Task) => task.status == "done"))}
					setErrorMessage={(message: string) => props.setErrorMessage(message)}
					setShowError={(isShow: boolean) => props.setShowError(isShow)}
					setLoading={(isLoading: boolean) => props.setLoading(isLoading)}
					handleGetTaskOfProject={handleGetTaskOfProject}
				/>
			</DragDropContext>
			{props.showModalCreateTask ? (
				<ModalCreateTask
					token={props.token}
					close={() => props.closeModalCreateTask()}
					setErrorMessage={(message: string) => props.setErrorMessage(message)}
					setShowError={(isShow: boolean) => props.setShowError(isShow)}
					setLoading={(isLoading: boolean) => props.setLoading(isLoading)}
					handleGetTaskOfProject={handleGetTaskOfProject}
				/>
			) : (
				""
			)}
		</div>
	);
}

export default Management;
